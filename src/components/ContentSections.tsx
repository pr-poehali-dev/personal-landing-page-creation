import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import AnimatedIcon from '@/components/AnimatedIcon';

export default function ContentSections() {
  return (
    <>
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
                  const rotateX = ((y - centerY) / centerY) * 5;
                  const rotateY = ((centerX - x) / centerX) * 5;
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                }}
              >
                <CardContent className="pt-8 pb-8">
                  <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-accent transition-colors">{caseItem.title}</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Icon name="AlertCircle" size={18} className="text-destructive" />
                      <span className="text-sm">{caseItem.problem}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="CheckCircle" size={18} className="text-success" />
                      <span className="text-sm font-semibold">{caseItem.result}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={18} className="text-accent" />
                      <span className="text-sm">{caseItem.time}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-16">
            Отзывы клиентов
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Алексей М.",
                text: "Заблокировали счёт на 1.8 млн. Банк молчал 3 недели. Юлия за 5 дней всё решила!",
                rating: 5
              },
              {
                name: "Мария К.",
                text: "Помогла вернуть налоговый вычет, который мне отказывались давать год. Профессионально и быстро.",
                rating: 5
              },
              {
                name: "Дмитрий П.",
                text: "Чуть не перевел деньги мошенникам. Юлия вовремя предупредила и объяснила схему. Спасибо!",
                rating: 5
              },
              {
                name: "Елена Т.",
                text: "Теперь все финансовые вопросы только через неё. Надёжно, понятно, без лишних слов.",
                rating: 5
              }
            ].map((review, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-2 border-border">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                      <Icon name="User" size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-primary">{review.name}</h4>
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
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-white text-lg px-8"
                onClick={() => window.location.href = 'tel:+79502929607'}
              >
                <Icon name="Phone" size={20} className="mr-2" />
                Позвонить
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white text-primary hover:bg-white/90 text-lg px-8"
                onClick={() => window.open('https://t.me/LevitskayaJul_bot', '_blank')}
              >
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Написать в Telegram
              </Button>
            </div>
            <p className="text-sm text-white/70 mt-4">
              +7 (950) 292-96-07
            </p>
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
    </>
  );
}