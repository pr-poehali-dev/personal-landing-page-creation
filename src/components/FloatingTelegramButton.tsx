import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function FloatingTelegramButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="lg"
        className="bg-[#0088cc] hover:bg-[#0088cc]/90 text-white rounded-full w-16 h-16 shadow-2xl hover:scale-110 transition-transform"
        onClick={() => window.open('https://t.me/LevitskayaJul_bot', '_blank')}
        aria-label="Написать в Telegram"
      >
        <Icon name="MessageCircle" size={28} />
      </Button>
    </div>
  );
}
