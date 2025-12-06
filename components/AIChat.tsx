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
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999]">
      {/* Chat Toggle */}
      <motion.button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-vermilion text-white p-3 sm:p-4 rounded-full shadow-2xl hover:shadow-vermilion/25 transition-all duration-300 magnetic group relative overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        <div className="relative">
          {!isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
        
        {/* Notification dot for new users */}
        {!isOpen && messages.length === 0 && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
        )}
      </motion.button>
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] max-w-sm sm:w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-stone/10 overflow-hidden z-[9999]"
            style={{ overscrollBehavior: 'contain' }}
            onWheel={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            
            {/* Header */}
            <div className="bg-gradient-to-r from-vermilion to-vermilion/90 text-white p-3 sm:p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-grain opacity-10" />
              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium">AI Assistant</h3>
                    <div className="flex items-center gap-2 text-xs opacity-90">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span>Online • Shichifuku Tekx</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Messages */}
            <div 
              className="chat-messages h-60 sm:h-80 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-paper/30 to-white"
              style={{ 
                overscrollBehavior: 'contain',
                WebkitOverflowScrolling: 'touch'
              }}
              onWheel={(e) => {
                e.stopPropagation();
                const element = e.currentTarget;
                const isAtTop = element.scrollTop === 0;
                const isAtBottom = element.scrollHeight - element.clientHeight <= element.scrollTop + 1;
                
                if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
                  e.preventDefault();
                }
              }}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              
              {/* Quick Actions (shown when no messages) */}
              {messages.length <= 1 && (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(action)}
                        className="text-xs bg-vermilion/5 text-vermilion px-2 sm:px-3 py-1 sm:py-2 rounded-full hover:bg-vermilion/10 transition-colors border border-vermilion/20"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Message List */}
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-vermilion text-white rounded-br-sm shadow-sm' 
                      : 'bg-white border border-stone/10 text-ink rounded-bl-sm shadow-sm'
                  }`}>
                    <div className="text-sm leading-relaxed whitespace-pre-line">
                      {message.content}
                    </div>
                    <div className={`text-xs mt-2 opacity-60 ${message.role === 'user' ? 'text-white/70' : 'text-stone/50'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-stone/10 p-3 rounded-lg rounded-bl-sm shadow-sm">
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-vermilion/60 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="p-3 sm:p-4 border-t border-stone/10 bg-white">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask about our services..."
                  className="flex-1 p-2 sm:p-3 text-sm border border-stone/20 rounded-lg focus:outline-none focus:border-vermilion focus:ring-2 focus:ring-vermilion/10 transition-all"
                  disabled={isTyping}
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-vermilion text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-vermilion/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                  <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </div>
              
              {/* Footer */}
              <div className="mt-3 text-center">
                <p className="text-xs text-stone/50">
                  Powered by Shichifuku Tekx • <span className="text-vermilion">AI Solutions for the GCC</span>
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