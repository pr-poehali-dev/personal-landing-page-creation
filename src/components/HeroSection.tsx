import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface HeroSectionProps {
  scrollY: number;
  scrollToSection: (id: string) => void;
}

export default function HeroSection({ scrollY, scrollToSection }: HeroSectionProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    tariff: '',
    consent: false
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleSubmitForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) errors.fullName = 'Введите ФИО';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Введите корректный email';
    }
    if (!formData.tariff) errors.tariff = 'Выберите тариф';
    if (!formData.consent) errors.consent = 'Необходимо согласие на обработку данных';

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log('Заявка отправлена:', formData);
      setFormOpen(false);
      setFormData({ fullName: '', email: '', tariff: '', consent: false });
      setFormErrors({});
    }
  };

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div 
          className="absolute top-40 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div 
          className="absolute bottom-10 left-1/2 w-80 h-80 bg-success/10 rounded-full blur-3xl"
          style={{ transform: `translate(-50%, ${scrollY * 0.2}px)` }}
        />
      </div>

      <div 
        className="container mx-auto text-center max-w-4xl relative"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 animate-fade-in">
          Ваш личный финансовый защитник
        </h1>
        <p className="text-xl text-muted-foreground mb-8 animate-slide-up">
          10 лет в банковской системе — теперь на вашей стороне
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <Dialog open={formOpen} onOpenChange={setFormOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8">
                Получить диагностику
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl">Оставить заявку</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="fullName">ФИО *</Label>
                  <Input
                    id="fullName"
                    placeholder="Иванов Иван Иванович"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      setFormErrors({ ...formErrors, fullName: '' });
                    }}
                    className={formErrors.fullName ? 'border-red-500' : ''}
                  />
                  {formErrors.fullName && (
                    <p className="text-sm text-red-500 mt-1">{formErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setFormErrors({ ...formErrors, email: '' });
                    }}
                    className={formErrors.email ? 'border-red-500' : ''}
                  />
                  {formErrors.email && (
                    <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="tariff">Выберите тариф *</Label>
                  <Select
                    value={formData.tariff}
                    onValueChange={(value) => {
                      setFormData({ ...formData, tariff: value });
                      setFormErrors({ ...formErrors, tariff: '' });
                    }}
                  >
                    <SelectTrigger className={formErrors.tariff ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Выберите тариф" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diagnostic">Диагностика — 5000₽</SelectItem>
                      <SelectItem value="basic">Базовый — 15000₽</SelectItem>
                      <SelectItem value="standard">Стандарт — 30000₽</SelectItem>
                      <SelectItem value="premium">Премиум — 50000₽</SelectItem>
                    </SelectContent>
                  </Select>
                  {formErrors.tariff && (
                    <p className="text-sm text-red-500 mt-1">{formErrors.tariff}</p>
                  )}
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => {
                      setFormData({ ...formData, consent: checked as boolean });
                      setFormErrors({ ...formErrors, consent: '' });
                    }}
                    className={formErrors.consent ? 'border-red-500' : ''}
                  />
                  <label
                    htmlFor="consent"
                    className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Я согласен на обработку персональных данных
                  </label>
                </div>
                {formErrors.consent && (
                  <p className="text-sm text-red-500">{formErrors.consent}</p>
                )}

                <Button 
                  onClick={handleSubmitForm}
                  className="w-full bg-accent hover:bg-accent/90"
                >
                  Отправить заявку
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => scrollToSection('services')}>
            Узнать больше
          </Button>
        </div>
      </div>

      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
