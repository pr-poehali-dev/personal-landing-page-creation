import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface TeamMember {
  name: string;
  position: string;
  photo: string | null;
}

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: "Юлия Левицкая", position: "Учредитель", photo: null },
    { name: "Имя Фамилия", position: "Бухгалтер", photo: null },
    { name: "Имя Фамилия", position: "Ведущий юрист", photo: null }
  ]);
  const [editingMember, setEditingMember] = useState<number | null>(null);

  return (
    <section id="team" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-16">
          Команда
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="hover:shadow-xl transition-all hover:scale-105 border-2 border-border relative group">
              <CardContent className="pt-12 pb-8 text-center">
                {editingMember === index ? (
                  <div className="space-y-4">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center relative overflow-hidden cursor-pointer"
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              const newMembers = [...teamMembers];
                              newMembers[index].photo = e.target?.result as string;
                              setTeamMembers(newMembers);
                            };
                            reader.readAsDataURL(file);
                          }
                        };
                        input.click();
                      }}
                    >
                      {member.photo ? (
                        <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <Icon name="Upload" size={48} className="text-white" />
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`name-${index}`} className="text-sm">Имя</Label>
                      <Input
                        id={`name-${index}`}
                        value={member.name}
                        onChange={(e) => {
                          const newMembers = [...teamMembers];
                          newMembers[index].name = e.target.value;
                          setTeamMembers(newMembers);
                        }}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`position-${index}`} className="text-sm">Должность</Label>
                      <Input
                        id={`position-${index}`}
                        value={member.position}
                        onChange={(e) => {
                          const newMembers = [...teamMembers];
                          newMembers[index].position = e.target.value;
                          setTeamMembers(newMembers);
                        }}
                        className="mt-1"
                      />
                    </div>
                    <Button
                      onClick={() => setEditingMember(null)}
                      className="w-full bg-accent hover:bg-accent/90"
                    >
                      Готово
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center overflow-hidden">
                      {member.photo ? (
                        <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <Icon name="User" size={64} className="text-white" />
                      )}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-primary">{member.name}</h3>
                    <p className="text-muted-foreground text-lg mb-4">{member.position}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingMember(index)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon name="Edit" size={16} className="mr-2" />
                      Редактировать
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
