import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import AnimatedIcon from '@/components/AnimatedIcon';

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
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
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8" onClick={() => scrollToSection('contact')}>
              Получить диагностику
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => scrollToSection('services')}>
              Узнать больше
            </Button>
          </div>
        </div>

        <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            Вас заблокировали счёт?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Не можете получить зарплату",
              "Не получается оплатить счета и кредиты",
              "Не можете вывести деньги из инвестиций",
              "Банк пишет только формальные отписки"
            ].map((problem, index) => (
              <Card key={index} className="border-l-4 border-l-destructive hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <AnimatedIcon type="problem" size={48} />
                    <p className="text-lg flex-1">{problem}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-16">
            Я помогаю в четырёх сценариях
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "unlock" as const,
                title: "Разблокировка счётов",
                desc: "Анализирую выписку, готовлю документы, разморожу за 5-7 дней"
              },
              {
                icon: "document" as const,
                title: "Налоги & Декларации",
                desc: "Считаю вычеты, готовлю декларацию, вернёт 50-300 тыс. ₽"
              },
              {
                icon: "user" as const,
                title: "Независимый консультант",
                desc: "Свой человек на долгие годы для всех финансовых вопросов"
              },
              {
                icon: "shield" as const,
                title: "Защита от мошенников",
                desc: "Разбираю ситуацию, объясняю права и возможные действия"
              }
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all hover:scale-105 border-t-4 border-t-accent group">
                <CardContent className="pt-8 pb-8">
                  <div className="mb-4">
                    <AnimatedIcon type={service.icon} size={72} />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-primary group-hover:text-accent transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground text-lg">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="cases" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-16">
            Реальные кейсы
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Разблокировал счёт за 5 дней",
                problem: "Блокировка 2.5 млн ₽",
                result: "Полная разблокировка",
                time: "5 дней"
              },
              {
                title: "Вернул налоговый вычет",
                problem: "Отказ от налоговой",
                result: "Вернули 260 тыс. ₽",
                time: "3 недели"
              },
              {
                title: "Защитил от мошенников",
                problem: "Попытка кражи 800 тыс. ₽",
                result: "Деньги сохранены",
                time: "1 день"
              }
            ].map((caseItem, index) => (
              <Card 
                key={index} 
                className="border-l-4 border-l-success group cursor-pointer perspective-1000"
                style={{ transformStyle: 'preserve-3d' }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 10;
                  const rotateY = (centerX - x) / 10;
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                }}
              >
                <CardContent className="pt-6 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <AnimatedIcon type="success" size={48} />
                    <h3 className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">{caseItem.title}</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Проблема:</span>
                      <span className="font-medium">{caseItem.problem}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Результат:</span>
                      <span className="font-medium text-success">{caseItem.result}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Срок:</span>
                      <span className="font-medium">{caseItem.time}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-16">
            Отзывы клиентов
          </h2>
          <div className="space-y-6">
            {[
              {
                name: "Александр К.",
                role: "Предприниматель",
                text: "За 6 дней разблокировал счёт на 1.8 млн. Банк молчал 2 недели, а тут всё решилось быстро. Профессионал своего дела!",
                rating: 5
              },
              {
                name: "Мария С.",
                role: "Фрилансер",
                text: "Помог вернуть налоговый вычет 180 тыс. рублей. Всё объяснил простым языком, сделал всё сам. Очень рекомендую!",
                rating: 5
              },
              {
                name: "Дмитрий П.",
                role: "IT-специалист",
                text: "Консультирует по всем финансовым вопросам. Теперь обращаюсь только к нему — надёжно и по делу.",
                rating: 5
              }
            ].map((review, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-2xl">
                      {review.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-primary">{review.name}</h4>
                          <p className="text-sm text-muted-foreground">{review.role}</p>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <span key={i} className="text-yellow-500">★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-16">
            Команда
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Юлия Левицкая",
                position: "Учредитель"
              },
              {
                name: "Имя Фамилия",
                position: "Бухгалтер"
              },
              {
                name: "Имя Фамилия",
                position: "Ведущий юрист"
              }
            ].map((member, index) => (
              <Card key={index} className="hover:shadow-xl transition-all hover:scale-105 border-2 border-border">
                <CardContent className="pt-12 pb-8 text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                    <Icon name="User" size={64} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-primary">{member.name}</h3>
                  <p className="text-muted-foreground text-lg">{member.position}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-16">
            Частые вопросы
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "Как быстро можно разблокировать счёт?",
                a: "В большинстве случаев 5-7 рабочих дней. Срок зависит от причины блокировки и банка."
              },
              {
                q: "Сколько стоят ваши услуги?",
                a: "Первая консультация бесплатно. Дальнейшая стоимость зависит от сложности задачи — обсуждаем индивидуально."
              },
              {
                q: "Какие документы нужны для работы?",
                a: "Обычно выписка из банка, паспорт и документы по операциям. Точный список скажу после анализа ситуации."
              },
              {
                q: "Вы работаете со всеми банками?",
                a: "Да, работаю со всеми крупными банками России. 10 лет опыта в банковской системе помогают решать вопросы эффективно."
              },
              {
                q: "Что делать, если банк уже отказал?",
                a: "Это не приговор. В 80% случаев после моего вмешательства вопрос решается положительно."
              }
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-primary hover:text-accent">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Получите бесплатную консультацию
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Разберу вашу ситуацию и предложу решение за 30 минут
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white text-lg px-8">
                <Icon name="Phone" size={20} className="mr-2" />
                Позвонить
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90 text-lg px-8">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Написать в Telegram
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
            💰 ФинКонсультант
          </div>
          <p className="text-white/80 mb-6">
            Профессиональное решение финансовых вопросов
          </p>
          <div className="flex justify-center gap-6 text-sm text-white/60">
            <span>ИП Иванов А.А.</span>
            <span>•</span>
            <span>ИНН 123456789012</span>
          </div>
        </div>
      </footer>
    </div>
  );
}