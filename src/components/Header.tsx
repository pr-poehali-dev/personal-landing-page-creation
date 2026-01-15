import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  scrollToSection: (id: string) => void;
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen, scrollToSection }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-primary flex items-center gap-2">
          💰 ФинКонсультант
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('services')} className="text-foreground hover:text-accent transition-colors">
            Услуги
          </button>
          <button onClick={() => scrollToSection('cases')} className="text-foreground hover:text-accent transition-colors">
            Кейсы
          </button>
          <button onClick={() => scrollToSection('reviews')} className="text-foreground hover:text-accent transition-colors">
            Отзывы
          </button>
          <button onClick={() => scrollToSection('team')} className="text-foreground hover:text-accent transition-colors">
            Команда
          </button>
          <button onClick={() => scrollToSection('faq')} className="text-foreground hover:text-accent transition-colors">
            Вопросы
          </button>
          <Button onClick={() => scrollToSection('contact')} className="bg-accent hover:bg-accent/90">
            Консультация
          </Button>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <button onClick={() => scrollToSection('services')} className="text-left text-foreground hover:text-accent transition-colors">
              Услуги
            </button>
            <button onClick={() => scrollToSection('cases')} className="text-left text-foreground hover:text-accent transition-colors">
              Кейсы
            </button>
            <button onClick={() => scrollToSection('reviews')} className="text-left text-foreground hover:text-accent transition-colors">
              Отзывы
            </button>
            <button onClick={() => scrollToSection('team')} className="text-left text-foreground hover:text-accent transition-colors">
              Команда
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-left text-foreground hover:text-accent transition-colors">
              Вопросы
            </button>
            <Button onClick={() => scrollToSection('contact')} className="bg-accent hover:bg-accent/90 w-full">
              Консультация
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
