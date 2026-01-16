
import React, { useState, useEffect, useCallback } from 'react';
import { Chat } from '@google/genai';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { DisclaimerModal } from './components/DisclaimerModal';
import { CrisisModal } from './components/CrisisModal';
import { ProfileView } from './components/ProfileView';
import { Message, View } from './types';
import { geminiService } from './services/geminiService';
import { JournalIcon, MessageSquareIcon, StethoscopeIcon, SunIcon } from './components/icons/Icons';

// Mock components for features not fully implemented in this scope
const MockFeature = ({ title, description }: { title: string; description: string; }) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white rounded-lg shadow-sm">
    <div className="p-4 bg-[#EAE2D8] rounded-full mb-4">
      {title === "Journal" && <JournalIcon className="w-8 h-8 text-[#7C5E4A]" />}
      {title === "Trackers" && <SunIcon className="w-8 h-8 text-[#7C5E4A]" />}
      {title === "Resources" && <StethoscopeIcon className="w-8 h-8 text-[#7C5E4A]" />}
    </div>
    <h2 className="text-2xl font-bold text-[#5B4F47] mb-2">{title}</h2>
    <p className="text-[#7C5E4A]">{description}</p>
    <p className="text-sm text-gray-400 mt-4">(This feature is a placeholder in this demo)</p>
  </div>
);

export default function App() {
  const [currentView, setCurrentView] = useState<View>(View.Chat);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(false);
  const [showCrisisModal, setShowCrisisModal] = useState<boolean>(false);

  useEffect(() => {
    const isDisclaimerAccepted = localStorage.getItem('disclaimerAccepted');
    if (!isDisclaimerAccepted) {
      setShowDisclaimer(true);
    }

    const startChat = async () => {
      setIsLoading(true);
      const session = await geminiService.startChatSession();
      setChatSession(session);
      setMessages([
        {
          id: Date.now(),
          text: "Hello, I'm Nadine, your compassionate companion. I'm here to offer a safe space to explore your feelings and find gentle support. How are you feeling today?",
          sender: 'ai',
        },
      ]);
      setIsLoading(false);
    };
    startChat();
  }, []);

  const handleAcceptDisclaimer = () => {
    localStorage.setItem('disclaimerAccepted', 'true');
    setShowDisclaimer(false);
  };

  const handleSendMessage = useCallback(async (text: string) => {
    if (!chatSession || isLoading) return;

    const userMessage: Message = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const isCrisis = await geminiService.checkForCrisis(text);
      if (isCrisis) {
        setShowCrisisModal(true);
        setIsLoading(false);
        return;
      }

      const stream = await geminiService.sendMessageStream(chatSession, text);
      let aiResponseText = '';
      const aiMessageId = Date.now() + 1;

      // Add a placeholder for the AI response
      setMessages(prev => [...prev, { id: aiMessageId, text: '', sender: 'ai' }]);

      for await (const chunk of stream) {
        const c = chunk;
        aiResponseText += c.text;
        setMessages(prev =>
          prev.map(msg =>
            msg.id === aiMessageId ? { ...msg, text: aiResponseText } : msg
          )
        );
      }
       if (aiResponseText.length === 0) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === aiMessageId ? { ...msg, text: "I'm sorry, I'm having trouble responding right now. Could you please try rephrasing?" } : msg
          )
        );
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: 'I apologize, but I seem to be having some trouble connecting. Please try again in a moment.',
        sender: 'ai',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [chatSession, isLoading]);

  const renderView = () => {
    switch (currentView) {
      case View.Chat:
        return <ChatWindow messages={messages} onSendMessage={handleSendMessage} isLoading={isLoading} />;
      case View.Journal:
        return <MockFeature title="Journal" description="A private space to write down your thoughts and feelings." />;
      case View.Trackers:
        return <MockFeature title="Trackers" description="Log sleep, feeding, and mood to see patterns over time." />;
      case View.Resources:
        return <MockFeature title="Resources" description="Find local support groups, therapists, and hotlines." />;
      case View.Profile:
        return <ProfileView />;
      default:
        return <ChatWindow messages={messages} onSendMessage={handleSendMessage} isLoading={isLoading} />;
    }
  };

  return (
    <>
      <DisclaimerModal isOpen={showDisclaimer} onAccept={handleAcceptDisclaimer} />
      <CrisisModal isOpen={showCrisisModal} onClose={() => setShowCrisisModal(false)} />
      <div className="flex h-screen w-full font-sans bg-[#F9F5F2] text-[#5B4F47]">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 h-screen">
            <header className="flex items-center pb-4 border-b border-[#EAE2D8]">
                <div className="p-2 bg-white rounded-full mr-3 shadow-sm">
                    <MessageSquareIcon className="w-6 h-6 text-[#7C5E4A]"/>
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-[#5B4F47]">Mind-Potency</h1>
                    <p className="text-sm text-[#9D8B80]">Gentle support for Postpartum</p>
                </div>
            </header>
            <div className="flex-1 overflow-y-auto mt-4">
                {renderView()}
            </div>
        </main>
      </div>
    </>
  );
}
