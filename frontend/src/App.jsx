import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './App.css'

// Modular Components & Pages
import Header from './components/Header.jsx'
import SetupPage from './pages/SetupPage.jsx'
import InterviewPage from './pages/InterviewPage.jsx'
import EvaluatingPage from './pages/EvaluatingPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const MOCK_QUESTIONS = [
  { id: 1, question: "What is the difference between state and props in React?" },
  { id: 2, question: "Explain the concept of virtual DOM and how React optimizes rendering." },
  { id: 3, question: "What are React Hooks, and what rules must be followed when using them?" },
  { id: 4, question: "How does the dependency array in useEffect work, and what happens if you omit it?" },
  { id: 5, question: "Explain the differences between client-side rendering (CSR) and server-side rendering (SSR)." }
]

const MOCK_EVALUATION = {
  overallScore: 8,
  summary: "The candidate demonstrates a solid conceptual understanding of the role. Answers are structured and clear. Elaborating on real-world edge cases and optimization patterns would help elevate the score to a Senior level.",
  results: [
    {
      question: "What is the difference between state and props in React?",
      answer: "",
      score: 8,
      feedback: "Great distinction made between props (passed from parent, read-only) and state (local data, mutable by component).",
      improvement: "Elaborate on how state updates are asynchronous and batched by React."
    },
    {
      question: "Explain the concept of virtual DOM and how React optimizes rendering.",
      answer: "",
      score: 9,
      feedback: "Excellent description of reconciliation and diffing. Understood that updating the real DOM is expensive and virtual DOM minimizes this overhead.",
      improvement: "Mention how the 'key' prop assists the diffing algorithm during list renders."
    },
    {
      question: "What are React Hooks, and what rules must be followed when using them?",
      answer: "",
      score: 7,
      feedback: "Identified rules correctly (only call at top level, only call from React function components). Description of custom hooks was a bit brief.",
      improvement: "Provide examples of common hooks like useContext or useRef to show versatility."
    }
  ]
}

function App() {
  // Navigation Phases: 'SETUP' | 'INTERVIEW' | 'EVALUATING' | 'RESULTS'
  const [phase, setPhase] = useState('SETUP')

  // Setup options
  const [role, setRole] = useState('')
  const [difficulty, setDifficulty] = useState('Mid Level')
  const [count, setCount] = useState(5)
  const [setupError, setSetupError] = useState('')
  const [demoMode, setDemoMode] = useState(false)

  // Interview state
  const [questions, setQuestions] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState({}) // { questionId: answerText }
  const [isGenerating, setIsGenerating] = useState(false)

  // Speech to Text state
  const [isRecording, setIsRecording] = useState(false)
  const [micStatus, setMicStatus] = useState('Click to start speaking')
  const recognitionRef = useRef(null)

  // Evaluating state
  const [loadingStep, setLoadingStep] = useState(0)
  const [evaluationResults, setEvaluationResults] = useState(null)

  // UI state for accordion in results
  const [expandedResults, setExpandedResults] = useState({})

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      const rec = new SpeechRecognition()
      rec.continuous = true
      rec.interimResults = false
      rec.lang = 'en-US'

      rec.onstart = () => {
        setIsRecording(true)
        setMicStatus('Listening... Speak clearly into your mic.')
      }

      rec.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript
        if (transcript) {
          const currentQ = questions[currentIdx]
          setAnswers(prev => {
            const currentAnswer = prev[currentQ.id] || ''
            const separator = currentAnswer.trim() ? ' ' : ''
            return {
              ...prev,
              [currentQ.id]: currentAnswer + separator + transcript.trim()
            }
          })
        }
      }

      rec.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsRecording(false)
        if (event.error === 'not-allowed') {
          setMicStatus('Microphone permission blocked. Please check browser settings.')
        } else {
          setMicStatus(`Error occurred: ${event.error}. Please try again.`)
        }
      }

      rec.onend = () => {
        setIsRecording(false)
        setMicStatus('Stopped listening. Click to record again.')
      }

      recognitionRef.current = rec
    } else {
      setMicStatus('Speech-to-text not supported in this browser.')
    }
  }, [questions, currentIdx])

  // Stop recording if we navigate questions
  useEffect(() => {
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }, [currentIdx])

  const toggleRecording = () => {
    if (!recognitionRef.current) return

    if (isRecording) {
      recognitionRef.current.stop()
    } else {
      try {
        setMicStatus('Connecting microphone...')
        recognitionRef.current.start()
      } catch (err) {
        console.error('Start recognition failed:', err)
      }
    }
  }

  // Handle generating questions
  const handleStartInterview = async (e) => {
    e.preventDefault()
    if (!role.trim()) {
      setSetupError('Please enter or select a job role.')
      return
    }
    setSetupError('')
    setIsGenerating(true)

    if (demoMode) {
      // Simulate question generation in Demo Mode
      setTimeout(() => {
        const sliced = MOCK_QUESTIONS.slice(0, count)
        setQuestions(sliced)
        setAnswers({})
        setCurrentIdx(0)
        setIsGenerating(false)
        setPhase('INTERVIEW')
      }, 1500)
      return
    }

    try {
      const response = await axios.post(`${API_BASE}/generateQuestions`, {
        role,
        difficulty,
        count: Number(count)
      })

      if (response.data && response.data.questions && response.data.questions.length > 0) {
        setQuestions(response.data.questions)
        setAnswers({})
        setCurrentIdx(0)
        setPhase('INTERVIEW')
      } else {
        setSetupError('No questions returned from backend. Try again.')
      }
    } catch (err) {
      console.error(err)
      const errorMsg = err.response?.data?.error || 'Failed to connect to backend server.'
      setSetupError(
        `${errorMsg} (Tip: If you do not have a valid Gemini API Key set, you can check the "Demo Mode" option below to test the interface.)`
      )
    } finally {
      setIsGenerating(false)
    }
  }

  // Handle evaluating answers
  const handleSubmitInterview = async () => {
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop()
    }

    setPhase('EVALUATING')
    setLoadingStep(0)

    // Simulating loading steps for rich UX
    const interval = setInterval(() => {
      setLoadingStep(prev => (prev < 3 ? prev + 1 : prev))
    }, 2000)

    if (demoMode) {
      setTimeout(() => {
        const simulatedResults = {
          overallScore: MOCK_EVALUATION.overallScore,
          summary: MOCK_EVALUATION.summary,
          results: questions.map((q, idx) => {
            const answerText = answers[q.id] || '';
            const matchingMock = MOCK_EVALUATION.results[idx] || {
              score: 7,
              feedback: "Decent attempt. The answer was relevant but could incorporate more structural terms.",
              improvement: "Try to explain concepts using architectural definitions."
            };
            return {
              question: q.question,
              answer: answerText,
              score: answerText.trim() ? matchingMock.score : 0,
              feedback: answerText.trim() ? matchingMock.feedback : "The question was left unanswered.",
              improvement: answerText.trim() ? matchingMock.improvement : "Please answer the question next time to receive detailed guidance."
            };
          })
        };
        
        setEvaluationResults(simulatedResults)
        setExpandedResults({ 0: true })
        setPhase('RESULTS')
        clearInterval(interval)
      }, 7000)
      return
    }

    try {
      // Map responses to match structure expected by backend
      const items = questions.map(q => ({
        question: q.question,
        answer: answers[q.id] || ''
      }))

      const response = await axios.post(`${API_BASE}/evaluateAnswers`, {
        role,
        items
      })

      setEvaluationResults(response.data)
      setExpandedResults({ 0: true })
      setPhase('RESULTS')
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.error || 'Failed to evaluate answers. Returning to setup.')
      setPhase('SETUP')
    } finally {
      clearInterval(interval)
    }
  }

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1)
    }
  }

  const toggleResultAccordion = (index) => {
    setExpandedResults(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <div className="app-container">
      {/* Brand Header */}
      <Header />

      {/* PHASE 1: CONFIGURATION / SETUP */}
      {phase === 'SETUP' && (
        <SetupPage
          role={role}
          setRole={setRole}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          count={count}
          setCount={setCount}
          demoMode={demoMode}
          setDemoMode={setDemoMode}
          setupError={setupError}
          isGenerating={isGenerating}
          onSubmit={handleStartInterview}
        />
      )}

      {/* PHASE 2: ACTIVE INTERVIEW */}
      {phase === 'INTERVIEW' && questions.length > 0 && (
        <InterviewPage
          questions={questions}
          currentIdx={currentIdx}
          answers={answers}
          setAnswers={setAnswers}
          role={role}
          difficulty={difficulty}
          demoMode={demoMode}
          isRecording={isRecording}
          micStatus={micStatus}
          onToggleRecording={toggleRecording}
          onPrev={handlePrev}
          onNext={handleNext}
          onSubmit={handleSubmitInterview}
        />
      )}

      {/* PHASE 3: EVALUATING RESULTS */}
      {phase === 'EVALUATING' && (
        <EvaluatingPage loadingStep={loadingStep} />
      )}

      {/* PHASE 4: RESULTS DASHBOARD */}
      {phase === 'RESULTS' && evaluationResults && (
        <ResultsPage
          evaluationResults={evaluationResults}
          expandedResults={expandedResults}
          onToggleAccordion={toggleResultAccordion}
          onRestart={() => setPhase('SETUP')}
        />
      )}
    </div>
  )
}

export default App
