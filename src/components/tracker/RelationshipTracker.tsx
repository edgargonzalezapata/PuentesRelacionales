// src/components/tracker/RelationshipTracker.tsx
"use client";

import { useState, useEffect, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ListChecks, PlusCircle, Trash2, Target } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export function RelationshipTracker() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const storedTasks = localStorage.getItem('relationalTasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && isClient) {
      // Only save if tasks array has been initialized from localStorage or changed
      if (tasks.length > 0 || localStorage.getItem('relationalTasks') !== null) {
        localStorage.setItem('relationalTasks', JSON.stringify(tasks));
      }
    }
  }, [tasks, isClient]);

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    setNewTaskText('');
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const totalTasksCount = tasks.length;
  const progressPercentage = totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;

  if (!isClient) {
    return (
      <Card className="w-full shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Target className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-headline text-primary">Relationship Goals Tracker</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground">Loading tracker...</CardDescription>
        </CardHeader>
        <CardContent className="h-40 flex items-center justify-center">
          <p className="text-muted-foreground">Initializing your relationship goals...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-lg bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Target className="h-8 w-8 text-primary" />
          <CardTitle className="text-2xl font-headline text-primary">Relationship Goals Tracker</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Log your efforts and visualize your commitment to building stronger connections.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleAddTask} className="flex gap-2 items-center">
          <Input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="E.g., 'Called an old friend'"
            className="flex-grow border-border focus:ring-primary"
            aria-label="New relational goal"
          />
          <Button type="submit" size="icon" variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <PlusCircle className="h-5 w-5" />
            <span className="sr-only">Add Goal</span>
          </Button>
        </form>

        {totalTasksCount > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Progress: {completedTasksCount} / {totalTasksCount} completed</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2 [&>div]:bg-primary" />
          </div>
        )}

        <Separator />

        {tasks.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No goals added yet. Start building!</p>
        ) : (
          <ScrollArea className="h-64 pr-3">
            <ul className="space-y-3">
              {tasks.map(task => (
                <li
                  key={task.id}
                  className={`flex items-center justify-between p-3 rounded-md transition-all
                              ${task.completed ? 'bg-green-500/10 border-l-4 border-green-500' : 'bg-secondary/30'}`}
                >
                  <div className="flex items-center gap-3 flex-grow">
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => toggleTaskCompletion(task.id)}
                      aria-labelledby={`task-label-${task.id}`}
                      className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    />
                    <label
                      htmlFor={`task-${task.id}`}
                      id={`task-label-${task.id}`}
                      className={`flex-grow cursor-pointer ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}
                    >
                      {task.text}
                    </label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTask(task.id)}
                    className="text-muted-foreground hover:text-destructive shrink-0"
                    aria-label={`Delete task: ${task.text}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
