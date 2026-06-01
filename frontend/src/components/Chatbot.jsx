import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Chatbot.css';

/* ── Rule-based healthcare responses (multilingual) ── */
const RESPONSES = {
  en: {
    greeting: "Hello! 👋 I'm your HealthHub assistant. How can I help you today?",
    notWell: "I'm sorry to hear you're not feeling well. 😟 I'd recommend booking an appointment with one of our General Physicians. You can browse available doctors on our Doctors page, or call us at +91 11-2345-6789 for immediate assistance.",
    appointment: "To book an appointment:\n1. Go to the Doctors page\n2. Choose a doctor and click 'Book Appointment'\n3. Or log in to your Dashboard and fill the booking form\n\nNeed help choosing a doctor? Just ask!",
    fees: "Our consultation fees range from ₹350 to ₹1500 depending on the specialty:\n• General Physician: ₹400\n• Ayurveda: ₹350\n• Pediatrics: ₹500\n• Cardiology: ₹800\n• Neurology: ₹1200\n• Orthopedics: ₹1500",
    doctors: "We have 8+ specialists including:\n• Dr. Priya Sharma — Cardiologist (Apollo, Mumbai)\n• Dr. Arjun Patel — Neurologist (Fortis, Delhi)\n• Dr. Vikram Singh — Pediatrician (AIIMS, Delhi)\n• Dr. Anil Deshmukh — Ayurveda (Pune)\n\nVisit our Doctors page to see all available doctors!",
    locations: "We have clinics in 5 major cities:\n📍 Delhi — Connaught Place\n📍 Mumbai — Andheri West\n📍 Bengaluru — Koramangala\n📍 Chennai — T. Nagar\n📍 Kolkata — Park Street\n\nCheck our Contact page for the interactive map!",
    emergency: "🚨 For emergencies:\n• Ambulance: 108\n• Emergency Services: 112\n• Poison Control: 1800-11-6117\n• Women Helpline: 1091\n\nPlease call immediately if it's urgent!",
    insurance: "We work with major insurance providers:\n• Star Health\n• ICICI Lombard\n• HDFC Ergo\n• Bajaj Allianz\n• New India Assurance\n\nYou can verify coverage during the booking process.",
    cancel: "Yes, you can cancel or reschedule from your Dashboard. Cancellations are free if done 24 hours before the appointment. For last-minute changes, call us at +91 11-2345-6789.",
    hours: "Our clinics are open:\n🕐 Monday–Saturday: 9:00 AM – 8:00 PM IST\n🕐 Sunday: 10:00 AM – 2:00 PM (Emergency only)\n\nOur chatbot and phone support are available 24/7!",
    bmi: "You can calculate your BMI on our Health Tools page! Just enter your height and weight to get instant results with personalized health recommendations. Go to Health Tools from the navigation menu.",
    thanks: "You're welcome! 😊 Is there anything else I can help you with? Feel free to ask about doctors, appointments, fees, or locations!",
    fallback: "I understand you need help. Here are some things I can assist with:\n• 🏥 Finding a doctor\n• 📅 Booking appointments\n• 💰 Consultation fees\n• 📍 Clinic locations\n• 🏋️ BMI Calculator\n• 🚨 Emergency numbers\n\nJust ask about any of these topics!"
  },
  hi: {
    greeting: "नमस्ते! 👋 मैं HealthHub सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
    notWell: "आपकी तबीयत ठीक नहीं है सुनकर दुख हुआ। 😟 मैं सलाह दूंगा कि आप हमारे किसी जनरल फिजिशियन से अपॉइंटमेंट बुक करें। डॉक्टर पेज पर उपलब्ध डॉक्टर देखें, या +91 11-2345-6789 पर कॉल करें।",
    appointment: "अपॉइंटमेंट बुक करने के लिए:\n1. डॉक्टर पेज पर जाएं\n2. डॉक्टर चुनें और 'अपॉइंटमेंट बुक करें' पर क्लिक करें\n3. या डैशबोर्ड में लॉगिन करके बुकिंग फॉर्म भरें\n\nडॉक्टर चुनने में मदद चाहिए? बस पूछें!",
    fees: "हमारी परामर्श फीस ₹350 से ₹1500 तक है:\n• जनरल फिजिशियन: ₹400\n• आयुर्वेद: ₹350\n• बाल रोग: ₹500\n• हृदय रोग: ₹800\n• न्यूरोलॉजी: ₹1200\n• ऑर्थोपेडिक्स: ₹1500",
    doctors: "हमारे पास 8+ विशेषज्ञ हैं:\n• Dr. Priya Sharma — हृदय रोग विशेषज्ञ (Apollo, मुंबई)\n• Dr. Arjun Patel — न्यूरोलॉजिस्ट (Fortis, दिल्ली)\n• Dr. Vikram Singh — बाल रोग विशेषज्ञ (AIIMS, दिल्ली)\n• Dr. Anil Deshmukh — आयुर्वेद (पुणे)\n\nसभी डॉक्टर देखने के लिए डॉक्टर पेज पर जाएं!",
    locations: "हमारे 5 प्रमुख शहरों में क्लीनिक हैं:\n📍 दिल्ली — कनॉट प्लेस\n📍 मुंबई — अंधेरी वेस्ट\n📍 बेंगलुरु — कोरमंगला\n📍 चेन्नई — टी. नगर\n📍 कोलकाता — पार्क स्ट्रीट",
    emergency: "🚨 आपातकाल के लिए:\n• एम्बुलेंस: 108\n• आपातकालीन सेवाएं: 112\n• विष नियंत्रण: 1800-11-6117\n• महिला हेल्पलाइन: 1091\n\nकृपया तुरंत कॉल करें!",
    insurance: "हम प्रमुख बीमा प्रदाताओं के साथ काम करते हैं:\n• Star Health\n• ICICI Lombard\n• HDFC Ergo\n• Bajaj Allianz\n• New India Assurance",
    cancel: "हां, आप डैशबोर्ड से अपॉइंटमेंट रद्द या पुनर्निर्धारित कर सकते हैं। 24 घंटे पहले रद्दीकरण मुफ्त है।",
    hours: "हमारे क्लीनिक खुले हैं:\n🕐 सोमवार–शनिवार: सुबह 9 – रात 8 बजे\n🕐 रविवार: सुबह 10 – दोपहर 2 बजे (केवल आपातकाल)",
    bmi: "आप हमारे स्वास्थ्य उपकरण पेज पर अपना BMI कैलकुलेट कर सकते हैं! बस अपनी ऊंचाई और वज़न दर्ज करें।",
    thanks: "आपका स्वागत है! 😊 क्या कोई और मदद चाहिए?",
    fallback: "मैं समझता हूं कि आपको मदद चाहिए। मैं इनमें सहायता कर सकता हूं:\n• 🏥 डॉक्टर खोजना\n• 📅 अपॉइंटमेंट बुकिंग\n• 💰 परामर्श शुल्क\n• 📍 क्लीनिक स्थान\n• 🏋️ BMI कैलकुलेटर\n• 🚨 आपातकालीन नंबर\n\nइनमें से किसी भी विषय पर पूछें!"
  },
  kn: {
    greeting: "ನಮಸ್ಕಾರ! 👋 ನಾನು HealthHub ಸಹಾಯಕ. ಇಂದು ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
    notWell: "ನಿಮಗೆ ಆರೋಗ್ಯ ಸರಿಯಿಲ್ಲ ಎಂದು ಕೇಳಿ ಬೇಸರವಾಯಿತು. 😟 ನಮ್ಮ ಜನರಲ್ ಫಿಸಿಶಿಯನ್ ಬಳಿ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಲು ಸಲಹೆ ನೀಡುತ್ತೇನೆ. +91 11-2345-6789 ಗೆ ಕರೆ ಮಾಡಿ.",
    appointment: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಲು:\n1. ವೈದ್ಯರ ಪುಟಕ್ಕೆ ಹೋಗಿ\n2. ವೈದ್ಯರನ್ನು ಆಯ್ಕೆ ಮಾಡಿ 'ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ' ಕ್ಲಿಕ್ ಮಾಡಿ\n3. ಅಥವಾ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಲಾಗಿನ್ ಮಾಡಿ",
    fees: "ನಮ್ಮ ಸಮಾಲೋಚನೆ ಶುಲ್ಕ ₹350 ರಿಂದ ₹1500:\n• ಜನರಲ್ ಫಿಸಿಶಿಯನ್: ₹400\n• ಆಯುರ್ವೇದ: ₹350\n• ಮಕ್ಕಳ ವೈದ್ಯ: ₹500\n• ಹೃದಯ ರೋಗ: ₹800",
    doctors: "ನಮ್ಮಲ್ಲಿ 8+ ತಜ್ಞರಿದ್ದಾರೆ. ವೈದ್ಯರ ಪುಟಕ್ಕೆ ಭೇಟಿ ನೀಡಿ!",
    locations: "ನಮ್ಮ ಕ್ಲಿನಿಕ್‌ಗಳು:\n📍 ದೆಹಲಿ\n📍 ಮುಂಬೈ\n📍 ಬೆಂಗಳೂರು\n📍 ಚೆನ್ನೈ\n📍 ಕೊಲ್ಕತ್ತಾ",
    emergency: "🚨 ತುರ್ತು:\n• ಆಂಬುಲೆನ್ಸ್: 108\n• ತುರ್ತು ಸೇವೆ: 112\nಕೂಡಲೇ ಕರೆ ಮಾಡಿ!",
    insurance: "Star Health, ICICI Lombard, HDFC Ergo ಸೇರಿದಂತೆ ಪ್ರಮುಖ ವಿಮಾ ಪೂರೈಕೆದಾರರೊಂದಿಗೆ ಕೆಲಸ ಮಾಡುತ್ತೇವೆ.",
    cancel: "ಹೌದು, ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ನಿಂದ ರದ್ದು ಮಾಡಬಹುದು. 24 ಗಂಟೆ ಮೊದಲು ಉಚಿತ.",
    hours: "🕐 ಸೋಮ–ಶನಿ: ಬೆಳಿಗ್ಗೆ 9 – ರಾತ್ರಿ 8",
    bmi: "ಆರೋಗ್ಯ ಸಾಧನಗಳ ಪುಟದಲ್ಲಿ ನಿಮ್ಮ BMI ಲೆಕ್ಕ ಹಾಕಿ!",
    thanks: "ಸ್ವಾಗತ! 😊 ಬೇರೆ ಏನಾದರೂ ಸಹಾಯ ಬೇಕೇ?",
    fallback: "ನಾನು ಈ ವಿಷಯಗಳಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಹುದು:\n• 🏥 ವೈದ್ಯರನ್ನು ಹುಡುಕಿ\n• 📅 ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್\n• 💰 ಶುಲ್ಕ\n• 📍 ಸ್ಥಳಗಳು\n• 🚨 ತುರ್ತು ನಂಬರ್"
  },
  mr: {
    greeting: "नमस्कार! 👋 मी HealthHub सहाय्यक आहे. आज मी तुम्हाला कशी मदत करू शकतो?",
    notWell: "तुम्हाला बरं वाटत नाही ऐकून वाईट वाटलं. 😟 आमच्या जनरल फिजिशियनकडे अपॉइंटमेंट बुक करा. +91 11-2345-6789 वर कॉल करा.",
    appointment: "अपॉइंटमेंट बुक करण्यासाठी:\n1. डॉक्टर पेजवर जा\n2. डॉक्टर निवडा आणि 'अपॉइंटमेंट बुक करा' वर क्लिक करा\n3. किंवा डॅशबोर्डमध्ये लॉगिन करा",
    fees: "आमची सल्लामसलत फी ₹350 ते ₹1500:\n• जनरल फिजिशियन: ₹400\n• आयुर्वेद: ₹350\n• बालरोग: ₹500\n• हृदयरोग: ₹800",
    doctors: "आमच्याकडे 8+ तज्ञ आहेत. डॉक्टर पेजला भेट द्या!",
    locations: "आमचे क्लिनिक:\n📍 दिल्ली\n📍 मुंबई\n📍 बेंगळुरू\n📍 चेन्नई\n📍 कोलकाता",
    emergency: "🚨 आणीबाणी:\n• रुग्णवाहिका: 108\n• आपत्कालीन: 112\nलगेच कॉल करा!",
    insurance: "Star Health, ICICI Lombard, HDFC Ergo सह प्रमुख विमा प्रदात्यांसोबत काम करतो.",
    cancel: "होय, डॅशबोर्डवरून रद्द करता येते. 24 तास आधी मोफत.",
    hours: "🕐 सोम–शनि: सकाळी 9 – रात्री 8",
    bmi: "आरोग्य साधने पेजवर तुमचा BMI मोजा!",
    thanks: "आपले स्वागत आहे! 😊 अजून काही मदत हवी?",
    fallback: "मी या विषयांमध्ये मदत करू शकतो:\n• 🏥 डॉक्टर शोधा\n• 📅 अपॉइंटमेंट\n• 💰 शुल्क\n• 📍 ठिकाणे\n• 🚨 आपत्कालीन नंबर"
  }
};

/* ── Keyword matching rules ── */
const RULES = [
  { keys: ['not well', 'sick', 'fever', 'pain', 'headache', 'cold', 'cough', 'unwell', 'ill', 'hurt', 'tabiyat', 'bimar', 'bukhar', 'dard', 'sar dard', 'khansi', 'बीमार', 'बुखार', 'दर्द', 'खांसी', 'तबीयत', 'ಜ್ವರ', 'ನೋವು', 'ताप', 'दुखत'], topic: 'notWell' },
  { keys: ['appointment', 'book', 'schedule', 'slot', 'visit', 'अपॉइंटमेंट', 'बुक', 'ಅಪಾಯಿಂಟ್', 'ಬುಕ್'], topic: 'appointment' },
  { keys: ['fee', 'cost', 'price', 'charge', 'kitna', 'paisa', 'rupee', 'फीस', 'शुल्क', 'कितना', 'पैसा', 'ಶುಲ್ಕ', 'ಎಷ್ಟು'], topic: 'fees' },
  { keys: ['doctor', 'specialist', 'physician', 'surgeon', 'डॉक्टर', 'विशेषज्ञ', 'ವೈದ್ಯ', 'ತಜ್ಞ'], topic: 'doctors' },
  { keys: ['location', 'clinic', 'address', 'where', 'city', 'branch', 'kahan', 'पता', 'कहां', 'शहर', 'ಎಲ್ಲಿ', 'ಸ್ಥಳ', 'ठिकाण', 'कुठे'], topic: 'locations' },
  { keys: ['emergency', 'ambulance', 'urgent', '108', '112', 'आपातकाल', 'एम्बुलेंस', 'ತುರ್ತು', 'आणीबाणी'], topic: 'emergency' },
  { keys: ['insurance', 'bima', 'cover', 'claim', 'बीमा', 'इंश्योरेंस', 'ವಿಮೆ', 'विमा'], topic: 'insurance' },
  { keys: ['cancel', 'reschedule', 'change', 'रद्द', 'बदल', 'ರದ್ದು', 'रद्द'], topic: 'cancel' },
  { keys: ['time', 'hour', 'open', 'close', 'timing', 'समय', 'कब', 'खुल', 'ಸಮಯ', 'वेळ'], topic: 'hours' },
  { keys: ['bmi', 'weight', 'height', 'calculator', 'वज़न', 'ऊंचाई', 'ತೂಕ', 'ಎತ್ತರ', 'वजन'], topic: 'bmi' },
  { keys: ['thank', 'thanks', 'dhanyavad', 'shukriya', 'धन्यवाद', 'शुक्रिया', 'ಧನ್ಯವಾದ', 'आभार'], topic: 'thanks' },
  { keys: ['hi', 'hello', 'hey', 'namaste', 'नमस्ते', 'हेलो', 'ನಮಸ್ಕಾರ', 'नमस्कार'], topic: 'greeting' },
];

function matchTopic(text) {
  const lower = text.toLowerCase();
  for (const rule of RULES) {
    if (rule.keys.some((k) => lower.includes(k))) {
      return rule.topic;
    }
  }
  return 'fallback';
}

function Chatbot() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'assistant', content: RESPONSES[language]?.greeting || RESPONSES.en.greeting }]);
    }
  }, [isOpen, messages.length, language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate natural typing delay
    setTimeout(() => {
      const topic = matchTopic(text);
      const langResponses = RESPONSES[language] || RESPONSES.en;
      const reply = langResponses[topic] || langResponses.fallback;
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button
        type="button"
        className={`chatbot-fab ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chatbot"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className="chatbot-window animate-scale-in">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">🤖</div>
              <div>
                <div className="chatbot-title">{t('chatbot.title')}</div>
                <div className="chatbot-status">● Online</div>
              </div>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.role}`}>
                <div className="chat-bubble">{msg.content}</div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-message assistant">
                <div className="chat-bubble typing">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <input
              ref={inputRef}
              type="text"
              className="chatbot-input"
              placeholder={t('chatbot.placeholder')}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button type="button" className="chatbot-send" onClick={sendMessage} disabled={isTyping || !input.trim()}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
