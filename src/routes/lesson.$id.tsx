import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Flame, Gem, Heart, ShieldCheck, Sparkles, Trophy, Volume2, VolumeX, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LessonArt } from "@/components/lesson-art";
import { lessons } from "@/lib/lessons";
import { lessonStories } from "@/lib/lesson-stories";
import { useLearner } from "@/lib/learner";
import { playLessonSound } from "@/lib/lesson-sound";

export const Route = createFileRoute("/lesson/$id")({
  head: ({ params }) => {
    const lesson = lessons[Number(params.id) - 1];
    const title = `${lesson?.title ?? "Lesson unavailable"} — Revise`;
    const description = lesson?.subtitle ?? "Explore the Revise phone repair learning path.";
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: LessonRoute,
});

function LessonRoute() {
  const { id } = Route.useParams();
  const { completed } = useLearner();
  const index = Number(id) - 1;
  if (!Number.isInteger(index) || !lessons[index] || !lessonStories[index] || index > completed) {
    return <main className="lesson-unavailable"><ShieldCheck size={52} /><h1>One step at a time</h1><p>{lessons[index] ? "Finish your current lesson to unlock this challenge." : "This lesson isn’t on your learning path."}</p><Button asChild variant="chunky"><Link to="/">BACK TO LEARNING</Link></Button></main>;
  }
  return <LessonJourney key={id} index={index} />;
}

function Confetti() {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return <div className="lesson-confetti" aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <motion.span key={i} initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: ((i * 73) % 640) - 320, y: [0, -100 - (i % 4) * 35, 360], rotate: i * 53, opacity: [1, 1, 0] }} transition={{ duration: 1.7, delay: (i % 5) * .04 }} />)}</div>;
}

function Counter({ total }: { total: number }) {
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) { setValue(total); return; }
    const timer = window.setInterval(() => setValue(v => Math.min(total, v + 1)), 55);
    return () => window.clearInterval(timer);
  }, [total, reduced]);
  return <span>+{value}</span>;
}

function LessonJourney({ index }: { index: number }) {
  const content = lessonStories[index];
  const lesson = lessons[index];
  const { hearts, loseHeart, refillHearts, sound, setSound, completed, finishLesson } = useLearner();
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [quit, setQuit] = useState(false);
  const [burst, setBurst] = useState(0);
  const [shake, setShake] = useState(0);
  const reduced = useReducedMotion();
  const navigate = useNavigate();
  const quitRef = useRef<HTMLDialogElement>(null);
  const feedbackRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (quit) quitRef.current?.showModal(); else quitRef.current?.close();
  }, [quit]);
  useEffect(() => { if (feedback) feedbackRef.current?.focus(); }, [feedback]);
  if (!content || !lesson) return null;
  const total = content.stories.length + content.questions.length;
  const finished = step === total;
  const story = content.stories[step];
  const question = content.questions[step - content.stories.length];
  const exhausted = hearts === 0;
  const review = index < completed;
  const progress = (step + (feedback === "correct" ? 1 : 0)) / total * 100;
  const next = () => {
    playLessonSound(step + 1 === total ? "finish" : "click", sound);
    setStep(v => v + 1); setChoice(null); setFeedback(null);
    if (step + 1 === total) setBurst(v => v + 1);
  };
  const checkAnswer = () => {
    if (choice === null || !question || feedback || exhausted) return;
    const correct = choice === question.answer;
    setFeedback(correct ? "correct" : "wrong");
    playLessonSound(correct ? "correct" : "wrong", sound);
    if (correct) setBurst(v => v + 1); else { loseHeart(); setShake(v => v + 1); }
  };
  const finish = () => { finishLesson(index); void navigate({ to: "/" }); };
  return <div className="lesson-screen">
    <header className="lesson-header">
      <Button variant="ghost" size="icon" aria-label="Quit lesson" onClick={() => setQuit(true)}><X /></Button>
      <div className="lesson-progress" role="progressbar" aria-label="Lesson progress" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}><motion.div animate={{ width: `${progress}%` }} transition={{ duration: reduced ? 0 : .45 }}><span /></motion.div></div>
      <span className="lesson-hearts" aria-label={`${hearts} hearts remaining`}><Heart fill="currentColor" />{hearts}</span>
      <Button variant="ghost" size="icon" aria-label={sound ? "Mute lesson sounds" : "Enable lesson sounds"} onClick={() => setSound(!sound)}>{sound ? <Volume2 /> : <VolumeX />}</Button>
    </header>
    <main className="lesson-center">
      <AnimatePresence mode="wait">
        <motion.section key={step} className={`lesson-content ${finished ? "celebration" : ""}`} initial={{ opacity: 0, y: reduced ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -12 }} transition={{ duration: .22 }}>
          {finished ? <>
            <div className="lesson-kicker">REPAIR ROOKIE, RISING</div>
            <motion.div className="celebration-trophy" initial={{ scale: .5 }} animate={reduced ? { scale: 1 } : { scale: [ .5, 1.15, 1 ], rotate: [-8, 8, 0] }}><Trophy /><Sparkles className="trophy-spark" /></motion.div>
            <h1>Lesson complete!</h1><p>Small steps. Serious repair skills.</p>
            <div className="reward-grid"><div className="reward-xp"><span>TOTAL XP</span><strong><Zap fill="currentColor" /><Counter total={review ? 0 : 15} /></strong></div><div className="reward-gems"><span>GEMS EARNED</span><strong><Gem /><Counter total={review ? 0 : 5} /></strong></div></div>
            <div className="streak-celebration"><motion.span animate={reduced ? {} : { scale: [1, 1.2, 1], rotate: [-5, 5, -5] }} transition={{ duration: 1.5, repeat: Infinity }}><Flame fill="currentColor" /></motion.span><div><strong>{review ? "Nice refresher!" : "Your streak is fired up!"}</strong><p>{review ? "Strong foundations deserve a second look." : "1 learning day this session"}</p></div></div>
          </> : story ? <>
            <div className="lesson-kicker">{lesson.title} <span>· {step + 1} / {content.stories.length}</span></div>
            <h1>{story.title}</h1>
            <LessonArt kind={story.art} />
            <div className="story-badge"><WrenchBadge />{story.badge}</div>
            <div className="story-bubble"><h2>THE KEY RULE</h2><p>{story.rule}</p><div className="story-tip"><Sparkles /><p><strong>PRO TIP</strong>{story.tip}</p></div></div>
          </> : question ? <>
            <div className="lesson-kicker text-info">THE CHALLENGE <span>· {step - content.stories.length + 1} / {content.questions.length}</span></div>
            <h1>{question.title}</h1>
            {question.art ? <div className="quiz-art"><LessonArt kind={question.art} /></div> : <div className="challenge-symbol"><ShieldCheck /></div>}
            <motion.div key={shake} className="answer-options" animate={shake > 0 && !reduced ? { x: [0, -9, 9, -6, 6, 0] } : { x: 0 }} transition={{ duration: .35 }} role="group" aria-label="Answer choices">{question.options.map((option, i) => <Button key={option} variant="outline" className={`answer-option ${choice === i ? "answer-selected" : ""} ${feedback && i === question.answer ? "answer-correct" : ""} ${feedback === "wrong" && choice === i ? "answer-wrong" : ""}`} aria-pressed={choice === i} disabled={!!feedback || exhausted} onClick={() => { setChoice(i); playLessonSound("click", sound); }}><span className="answer-number">{i + 1}</span><span>{option}</span>{choice === i && <Check className="answer-check" />}</Button>)}</motion.div>
          </> : null}
        </motion.section>
      </AnimatePresence>
    </main>
    {burst > 0 && <Confetti key={burst} />}
    <footer className="lesson-footer"><div className="lesson-footer-inner"><span className="footer-caption"><ShieldCheck />{finished ? "A little better, every lesson." : story ? "KNOW IT. THEN TRY IT." : "YOU’VE GOT THIS."}</span><Button variant="chunky" className="lesson-continue" disabled={!finished && (!story && choice === null || exhausted)} onClick={finished ? finish : story ? next : checkAnswer}>{finished ? "FINISH" : story ? "CONTINUE" : "CHECK ANSWER"}<ArrowRight /></Button></div></footer>
    <AnimatePresence>{feedback && question && <motion.aside className={`feedback-drawer feedback-${feedback}`} initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 320, damping: 32 }} aria-live="polite"><div className="feedback-inner"><span className="feedback-icon">{feedback === "correct" ? <Check /> : <X />}</span><div className="feedback-copy"><h2 tabIndex={-1} ref={feedbackRef}>{feedback === "correct" ? "Beautifully done!" : exhausted ? "Time for a fresh start" : "Not quite. You’re learning!"}</h2><p>{question.explanation}</p>{feedback === "wrong" && <strong>Correct answer: {question.options[question.answer]}</strong>}</div><Button variant={feedback === "correct" ? "chunky" : "destructive"} className="lesson-continue" onClick={() => { if (feedback === "correct") next(); else if (exhausted) { refillHearts(); setStep(0); setChoice(null); setFeedback(null); playLessonSound("click", sound); } else { setChoice(null); setFeedback(null); playLessonSound("click", sound); } }}>{feedback === "correct" ? "CONTINUE" : exhausted ? "RESTART LESSON" : "TRY AGAIN"}<ArrowRight /></Button></div></motion.aside>}</AnimatePresence>
    {exhausted && !feedback && !finished && <div className="modal-backdrop"><section role="dialog" aria-modal="true" aria-label="No hearts remaining" className="lesson-modal"><Heart className="text-destructive" size={44} /><h2>A fresh start?</h2><p className="modal-description">Restart this lesson with five practice hearts.</p><Button variant="chunky" className="modal-action" onClick={() => { refillHearts(); setStep(0); }}>RESTART LESSON</Button><Button asChild variant="outline" className="modal-action"><Link to="/">BACK TO LEARNING</Link></Button></section></div>}
    <dialog ref={quitRef} className="quit-dialog" onCancel={event => { event.preventDefault(); setQuit(false); }} onClose={() => setQuit(false)}><span className="quit-heart"><Heart fill="currentColor" /></span><h2>Are you sure you want to quit?</h2><p>{finished ? "Finish now to collect your lesson rewards." : "Your progress in this lesson will be lost. Your learning path will stay right here."}</p><Button variant="chunky" className="modal-action" onClick={() => setQuit(false)} autoFocus>KEEP LEARNING</Button><Button asChild variant="outline" className="modal-action"><Link to="/">QUIT LESSON</Link></Button></dialog>
  </div>;
}

function WrenchBadge() { return <Zap size={14} fill="currentColor" />; }