import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Add custom scrollbar styles
const scrollbarStyles = `
  .chat-messages::-webkit-scrollbar {
    width: 6px;
  }
  .chat-messages::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }
  .chat-messages::-webkit-scrollbar-thumb {
    background: #DA2C38;
    border-radius: 3px;
  }
  .chat-messages::-webkit-scrollbar-thumb:hover {
    background: #b91c28;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = scrollbarStyles;
  document.head.appendChild(styleElement);
}

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(0);
  const [lastUserInput, setLastUserInput] = useState('');

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Welcome message on open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage("👋 Hello! I'm here to help you learn about Shichifuku Tekx's AI solutions. What can I assist you with today?");
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: messageIdRef.current++,
      role: 'assistant',
      content,
      timestamp: new Date()
    }]);
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: messageIdRef.current++,
      role: 'user',
      content,
      timestamp: new Date()
    }]);
  };

  // Smart response engine
  const getSmartResponse = (query: string): string => {
    const q = query.toLowerCase();

    // Greeting patterns
    if (q.match(/^(hi|hello|hey|good|salaam)/)) {
      return "Hello! I'm excited to help you explore how AI can transform your business. Are you interested in learning about our services, pricing, or perhaps a specific industry solution?";
    }

    // Service-specific responses
    if (q.includes('ai strategy') || q.includes('consultation') || q.includes('planning') || q.includes('roadmap')) {
      return "🎯 **AI Strategy & Consulting**\n\nWe help businesses in Dubai and the GCC create actionable AI roadmaps:\n• Readiness assessments\n• ROI projections \n• Proof-of-concept development\n• Team training programs\n\nStarting from AED 15,000. Would you like to schedule a free consultation to discuss your specific needs?";
    }

    if (q.includes('custom ai') || q.includes('machine learning') || q.includes('ml') || q.includes('artificial intelligence')) {
      return "🤖 **Custom AI Development**\n\nWe build intelligent systems tailored to your business:\n• Arabic NLP processing\n• Predictive analytics\n• Computer vision solutions\n• Recommendation engines\n• Chatbots and virtual assistants\n\nPerfect for businesses wanting competitive advantages. What specific AI capability interests you?";
    }

    if (q.includes('automation') || q.includes('workflow') || q.includes('process') || q.includes('efficiency')) {
      return "⚡ **Business Automation & Insights**\n\nTransform repetitive tasks into intelligent workflows:\n• Smart document processing\n• Automated customer service\n• Intelligent data analysis\n• Process optimization\n• Real-time dashboards\n\nTypical ROI: 3-5x within 12 months. What processes are you looking to automate?";
    }

    if (q.includes('healthcare') || q.includes('medical') || q.includes('hospital') || q.includes('clinic')) {
      return "🏥 **Healthcare AI Solutions**\n\nSpecialized for MENA healthcare providers:\n• Predictive diagnostics\n• Bilingual telemedicine platforms\n• Patient analytics and insights\n• Medical imaging analysis\n• Compliance monitoring\n\nDesigned with cultural sensitivity and local regulations. Are you with a healthcare organization?";
    }

    if (q.includes('fintech') || q.includes('finance') || q.includes('banking') || q.includes('sharia') || q.includes('islamic')) {
      return "💰 **Islamic Fintech AI**\n\nSharia-compliant financial AI solutions:\n• Algorithmic trading systems\n• Fraud detection and prevention\n• Risk assessment models\n• Compliance automation\n• Customer behavior analytics\n\nBuilt specifically for GCC financial institutions. What's your specific use case in finance?";
    }

    if (q.includes('web') || q.includes('website') || q.includes('app') || q.includes('mobile') || q.includes('development')) {
      return "📱 **AI-Integrated Development**\n\nModern digital experiences with AI:\n• AI-powered websites\n• Flutter mobile applications\n• Progressive web apps\n• E-commerce platforms\n• Legacy system enhancements\n\nAll optimized for the Middle East market. What type of platform are you looking to build?";
    }

    if (q.includes('edtech') || q.includes('education') || q.includes('learning') || q.includes('training')) {
      return "🎓 **EdTech AI Solutions**\n\nPersonalized learning for the digital age:\n• Adaptive learning platforms\n• AI tutoring systems\n• Performance tracking\n• Cultural curriculum adaptation\n• Multi-language support\n\nRespecting local educational values. What educational challenge are you solving?";
    }

    // Pricing inquiries
    if (q.includes('price') || q.includes('cost') || q.includes('budget') || q.includes('fee') || q.includes('investment')) {
      return "💡 **Investment Ranges**\n\n• AI Strategy: AED 15,000 - 50,000\n• Custom AI Development: AED 50,000 - 200,000+\n• Business Automation: AED 25,000 - 100,000\n• Web/Mobile Apps: AED 30,000 - 150,000\n• Industry Solutions: Custom pricing\n\nFinal pricing depends on scope and complexity. All projects include 6 months free support. Ready for a personalized quote?";
    }

    // Timeline questions
    if (q.includes('time') || q.includes('duration') || q.includes('long') || q.includes('when') || q.includes('delivery')) {
      return "⏰ **Project Timelines**\n\n• AI Strategy: 2-4 weeks\n• Custom AI Development: 8-16 weeks\n• Automation Projects: 4-8 weeks\n• Web/Mobile Apps: 6-12 weeks\n• Integration Projects: 2-6 weeks\n\nWe work in agile sprints with bi-weekly updates. What's your target launch date?";
    }

    // Contact/demo requests
    if (q.includes('contact') || q.includes('call') || q.includes('meet') || q.includes('demo') || q.includes('consultation') || q.includes('talk')) {
      return "📞 **Let's Connect!**\n\nReady to start your AI journey?\n\n🎯 **Free 30-min Strategy Call**\n📧 **Email**: hello@shichifukutekx.com\n🏢 **Office**: Dubai, UAE\n🌍 **Coverage**: Full GCC region\n\n**What we'll discuss:**\n• Your business challenges\n• AI opportunities\n• Custom roadmap\n• Next steps\n\nShall I help you schedule a consultation?";
    }

    // Location/coverage
    if (q.includes('dubai') || q.includes('uae') || q.includes('saudi') || q.includes('qatar') || q.includes('gcc') || q.includes('location') || q.includes('where')) {
      return "🌍 **Our Presence**\n\nHeadquartered in Dubai, serving the entire GCC:\n🇦🇪 UAE & Dubai (Headquarters)\n🇸🇦 Saudi Arabia\n🇶🇦 Qatar\n🇴🇲 Oman\n🇰🇼 Kuwait\n\nWe understand local business culture, regulations, and market dynamics. Where is your business located?";
    }

    // Support questions
    if (q.includes('support') || q.includes('maintenance') || q.includes('help') || q.includes('training') || q.includes('after')) {
      return "🛠️ **Ongoing Support & Success**\n\nWe ensure your long-term success:\n• 6 months free support included\n• 24/7 technical assistance\n• Comprehensive team training\n• Regular system optimization\n• Performance monitoring\n• Updates and enhancements\n\nYour success is our success. What type of ongoing support interests you?";
    }

    // Company/team questions
    if (q.includes('company') || q.includes('team') || q.includes('about') || q.includes('who') || q.includes('experience')) {
      return "🏛️ **About Shichifuku Tekx**\n\nWe're a premier AI & digital solutions company bridging traditional wisdom with algorithmic precision.\n\n**Our Philosophy:**\n• Shichifuku (七福) = Seven Gods of Fortune\n• Fortune through intelligent engineering\n• Cultural respect meets cutting-edge tech\n\n**Our Expertise:**\n• 50+ successful AI implementations\n• GCC market specialists\n• Multilingual team (Arabic/English)\n\nWhat would you like to know about our approach?";
    }

    // Technology stack
    if (q.includes('technology') || q.includes('tech') || q.includes('tools') || q.includes('stack') || q.includes('platform')) {
      return "⚙️ **Our Technology Stack**\n\n**AI/ML:**\n• Python, TensorFlow, PyTorch\n• OpenAI, Google AI, Custom models\n• Computer Vision, NLP\n\n**Development:**\n• React, Next.js, Flutter\n• Node.js, Laravel, FastAPI\n• Docker, Kubernetes\n\n**Cloud:**\n• AWS, Azure, Google Cloud\n• Edge computing, On-premise\n\nWe choose the right tools for your specific needs. What technology interests you?";
    }

    // ROI/Benefits questions
    if (q.includes('roi') || q.includes('benefit') || q.includes('value') || q.includes('return') || q.includes('advantage')) {
      return "📈 **ROI & Business Impact**\n\n**Typical Results:**\n• 40-60% process efficiency gains\n• 3-5x ROI within 12 months\n• 25-50% cost reduction\n• 80%+ accuracy improvements\n• 24/7 automated operations\n\n**Real Benefits:**\n• Competitive advantage\n• Scalable operations\n• Better decision making\n• Customer satisfaction\n\nWhat business metrics matter most to you?";
    }

    // Default intelligent response
    return "I'd love to help you explore our AI solutions! Here's what I can tell you about:\n\n🎯 **AI Strategy & Consulting** - Roadmaps and planning\n🤖 **Custom AI Development** - Tailored solutions\n⚡ **Business Automation** - Process optimization\n🏥 **Healthcare AI** - Medical solutions\n💰 **Fintech AI** - Financial technology\n📱 **Web & Mobile Apps** - Digital platforms\n🎓 **EdTech Solutions** - Educational technology\n💡 **Pricing & Timelines** - Investment information\n📞 **Free Consultation** - Let's talk!\n\nWhat interests you most, or do you have a specific question?";
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userInput = input.trim();

    // Prevent sending the same message repeatedly
    if (userInput === lastUserInput) {
      setInput('');
      return;
    }

    setLastUserInput(userInput);
    addUserMessage(userInput);
    setInput('');
    setIsTyping(true);

    // Simulate natural response delay
    setTimeout(() => {
      setIsTyping(false);
      addBotMessage(getSmartResponse(userInput));
    }, 800 + Math.random() * 1000);
  };

  const quickActions = [
    "AI Strategy Consultation",
    "Custom AI Development",
    "Business Automation",
    "Pricing Information",
    "Schedule a Demo",
    "Healthcare AI",
    "Fintech Solutions"
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] font-sans">
      {/* Chat Toggle */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            onClick={() => setIsOpen(true)}
            className="bg-ink text-white p-0 rounded-full shadow-2xl shadow-vermilion/20 hover:shadow-vermilion/40 transition-shadow duration-300 group relative overflow-hidden w-14 h-14 flex items-center justify-center border border-white/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-vermilion to-ink opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <img src="/icon.png" alt="Chat" className="w-8 h-8 object-contain filter brightness-0 invert" />
            </div>

            {/* Notification dot */}
            {messages.length === 0 && (
              <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vermilion opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-vermilion"></span>
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50, x: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-0 right-0 sm:bottom-20 sm:right-0 w-[calc(100vw-2rem)] sm:w-[400px] h-[600px] max-h-[80vh] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/20 border border-white/20 overflow-hidden z-[9999] flex flex-col"
          >

            {/* Header */}
            <div className="relative min-h-[80px] bg-ink flex items-center p-6 overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-vermilion/20 to-transparent" />
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-vermilion/30 rounded-full blur-2xl" />

              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10">
                    <img src="/icon.png" alt="Bot" className="w-6 h-6 object-contain filter brightness-0 invert" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-white tracking-wide">AI Assistant</h3>
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-white/70">Online</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="chat-messages flex-1 overflow-y-auto p-6 space-y-6 bg-stone/5 relative"
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Timestamp */}
              <div className="text-center">
                <span className="text-[10px] font-medium text-stone/40 uppercase tracking-widest bg-stone/10 px-3 py-1 rounded-full">
                  Today
                </span>
              </div>

              {/* Message List */}
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${message.role === 'user'
                    ? 'bg-vermilion text-white rounded-br-sm'
                    : 'bg-white text-ink border border-stone/10 rounded-bl-sm'
                    }`}>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
                      {message.content}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white border border-stone/10 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-vermilion/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-vermilion/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-vermilion/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions - Horizontal Scroll */}
            {messages.length <= 1 && (
              <div className="px-6 py-2 bg-stone/5 overflow-x-auto flex gap-2 no-scrollbar pb-4 mask-fade-right">
                {quickActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(action)}
                    className="whitespace-nowrap text-xs bg-white text-ink/70 px-4 py-2 rounded-full border border-stone/10 hover:border-vermilion hover:text-vermilion transition-all shadow-sm hover:shadow-md flex-shrink-0"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-stone/10 relative z-20">
              <div className="relative flex items-center bg-stone/5 rounded-xl border border-stone/10 focus-within:border-vermilion/50 focus-within:bg-white focus-within:shadow-lg focus-within:shadow-vermilion/5 transition-all duration-300">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent p-4 text-sm text-ink outline-none placeholder:text-stone/40"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="p-2 mr-2 text-vermilion disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 transition-transform"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </div>
              <div className="text-center mt-3">
                <p className="text-[10px] text-stone/40 font-medium tracking-wide">
                  SHICHIFUKU INTELLIGENCE ENGINE v2.0
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChat;