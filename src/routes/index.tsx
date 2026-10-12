import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronDown, ChevronRight, Clock3, Crown, Flame, Heart, LockKeyhole, Settings2, ShieldCheck, Sparkles, Star, Target, Trophy, UserRound, Wrench, X, Zap, CircleHelp, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { lessons } from "@/lib/lessons";
import mascot from "@/assets/revise-bot.png";
import { useLearner } from "@/lib/learner";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Learn phone repair — Revise Academy" },
    { name: "description", content: "Explore your repair learning path, meet your toolkit, and build practical phone repair knowledge with Revise." },
    { property: "og:title", content: "Learn phone repair — Revise Academy" },
    { property: "og:description", content: "Little lessons. Real repair skills. Start your phone repair journey with Revise." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Index() {
  const { pro, setPro, completed, hearts, xp, gems, sound, setSound } = useLearner();
  const [selected, setSelected] = useState<number | null>(null);
  const [panel, setPanel] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const lesson = selected === null ? null : lessons[selected];
  const close = () => { setSelected(null); setPanel(null); };
  const openLesson = (index: number) => { setSelected(index); };
  const nav = [
    { title: "Learn", icon: BookOpen },
    { title: "Practice", icon: Target },
    { title: "Pro workbench", icon: Wrench },
    { title: "Leaderboard", icon: Trophy },
    { title: "Profile", icon: UserRound },
  ];

  return (
    <div className="academy min-h-screen bg-background">
      <aside className="desktop-sidebar">
        <a href="/" className="wordmark" aria-label="Revise home"><span className="brand-mark"><Wrench /></span>revise<span className="text-primary">.</span></a>
        <span className="academy-label">THE PHONE REPAIR ACADEMY</span>
        <nav className="side-nav" aria-label="Main navigation">
          {nav.map(({ title, icon: Icon }, i) => <Button key={title} variant="ghost" className={`nav-item ${i === 0 ? "nav-selected" : ""}`} onClick={() => i === 0 ? close() : setPanel(title)}><Icon /><span>{title}</span>{title === "Pro workbench" && <span className="mini-pro">PRO</span>}</Button>)}
        </nav>
        <div className="sidebar-bottom"><div className="repair-club"><span className="club-icon"><ShieldCheck /></span><div><strong>Small steps.<br />Real repair skills.</strong><p>You’ve got this.</p></div></div><Button variant="ghost" onClick={() => setPanel("Settings")}><Settings2 /> Settings</Button><Button variant="ghost" onClick={() => setPanel("Help")}><CircleHelp /> Help & support</Button></div>
      </aside>

      <div className="app-shell">
        <header className="topbar">
          <a href="/" className="mobile-wordmark">revise<span className="text-primary">.</span></a>
          <div className="course-label"><span className="course-icon"><Wrench size={17} /></span><span>Phone repair</span><ChevronDown size={16} /></div>
          <div className="status-items">
            <Button variant="ghost" className="status-item text-warning" aria-label={`Streak: ${completed > 0 ? 1 : 0} session day`} onClick={() => setPanel("Your streak")}><Flame fill="currentColor" /><span>{completed > 0 ? 1 : 0}</span></Button>
            <Button variant="ghost" className="status-item text-info" aria-label="120 gears" onClick={() => setPanel("Your gears")}><Settings2 /><span>120</span></Button>
            <Button variant="ghost" className="status-item text-destructive" aria-label={`${hearts} out of 5 hearts`} onClick={() => setPanel("Your hearts")}><Heart fill="currentColor" /><span>{hearts}</span></Button>
            <Button variant="ghost" role="switch" aria-checked={pro} aria-label="Pro Member" onClick={() => setPro(!pro)} className={`pro-toggle ${pro ? "pro-on" : ""}`}><Crown /><span>PRO MEMBER</span><span className="toggle-track"><span /></span></Button>
          </div>
        </header>

        <div className="page-grid">
          <main className="learn-main">
            <div className="page-heading"><div><div className="eyebrow">YOUR REPAIR JOURNEY</div><h1>Little lessons. Big fixes.</h1><p>Build your skills, one screw at a time.</p></div><span className="heading-spark"><Sparkles /></span></div>
            <section className="unit-banner" aria-label="Unit 1 Repair foundations"><div className="unit-icon"><Wrench /></div><div className="min-w-0"><div className="unit-eyebrow">UNIT 1 · BEGINNER</div><h2>Repair foundations</h2><p>Get to know your tools and the basics.</p></div><Button variant="ghost" className="unit-guide" aria-label="Open unit guide" onClick={() => setPanel("Unit guide")}><BookOpen /><span>GUIDE</span></Button></section>
            <section className="learning-path" aria-label="Lesson path">
              <div className="path-line" />
              {lessons.map((item, index) => {
                const done = index < completed;
                const active = index === completed;
                const position = [0, -63, -95, -35, 38, 0][index] ?? 0;
                return <div key={item.title} className={`path-row path-position-${position < 0 ? `minus${Math.abs(position)}` : position}`}>
                  {active && <motion.div className="start-callout" animate={reduced ? {} : { y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2 }}>LET’S GO!</motion.div>}
                  <div className={active ? "active-ring" : "node-wrap"}><Button variant="ghost" className={`lesson-node ${done ? "node-done" : active ? "node-active" : "node-locked"}`} aria-label={`${item.title}${done ? ", completed" : active ? ", current lesson" : ", locked"}`} onClick={() => openLesson(index)}>{done ? <Check /> : active ? <Star fill="currentColor" /> : index === 5 ? <Trophy /> : <LockKeyhole />}</Button></div>
                  <span className={`node-label ${active ? "current-label" : ""}`}>{item.title}</span>
                </div>;
              })}
              <div className="mascot-scene"><motion.img src={mascot} alt="Chip, your friendly phone repair companion, holding a screwdriver" width={1024} height={1024} animate={reduced ? {} : { y: [0, -6, 0], rotate: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity }} /><div className="mascot-message">Every expert started<br />with the basics.<span>You’re in the right place!</span></div></div>
              <div className="path-finish"><span /><ShieldCheck /><span /></div>
            </section>
            <section className="next-unit"><div className="next-unit-lock"><LockKeyhole /></div><div><span>UNIT 2</span><h3>Under the screen</h3><p>A little deeper. A lot more possibilities.</p></div></section>
            <p className="learning-note"><ShieldCheck size={14} /> Learn safely. Follow device-specific guides for real repairs.</p>
          </main>

          <aside className="right-rail">
            <section className="pro-card"><div className="pro-card-top"><span className="pro-chip"><Crown size={13} /> REVISE PRO</span><Sparkles className="text-info" /></div><h2>Your next level<br />starts here.</h2><p>Meet your future repair workbench.</p><div className="mini-workbench" aria-hidden="true"><div className="tool-driver" /><div className="illustrated-phone"><div className="phone-camera" /><div className="phone-battery"><Zap fill="currentColor" /></div><div className="phone-lines" /></div><div className="tool-pick" /><div className="workbench-stars"><Sparkles /></div></div><Button variant="blue" className="w-full h-12" onClick={() => setPanel("Pro workbench")}>EXPLORE PRO <ArrowRight /></Button><span className="pro-card-note">Built for the curious. Made for the hands-on.</span></section>
            <section className="rail-card"><div className="rail-title"><h2>Daily goals</h2><span className="text-info">{Math.min(completed, 3)}/3</span></div><div className="goal-row"><span className="goal-icon text-warning"><Zap fill="currentColor" /></span><div><strong>Earn 40 XP</strong><div className="goal-progress"><span className={xp >= 40 ? "progress-full" : xp > 0 ? "progress-half" : ""} /></div><small>{xp} / 40 XP</small></div></div><div className="goal-row"><span className="goal-icon text-primary"><BookOpen /></span><div><strong>Complete a lesson</strong><div className="goal-progress"><span className={completed > 0 ? "progress-full" : ""} /></div><small>{Math.min(completed, 1)} / 1 lesson</small></div></div><div className="goal-row"><span className="goal-icon text-info"><Target /></span><div><strong>Build your foundations</strong><div className="goal-progress"><span className={completed >= 3 ? "progress-full" : completed > 0 ? "progress-half" : ""} /></div><small>{Math.min(completed, 3)} / 3 lessons</small></div></div></section>
            <section className="rail-card weekly-card"><span className="weekly-icon"><Trophy /></span><div><h2>A fresh start</h2><p>Your first lesson is the first win.</p><span className="weekly-xp">{xp} XP this session</span></div></section>
            <div className="rail-footer"><span>LEARN. REPAIR. REPEAT.</span><p>Made for a world worth repairing <Heart size={12} /></p></div>
          </aside>
        </div>
      </div>

      <nav className="mobile-nav" aria-label="Mobile navigation">{nav.filter((_, i) => i !== 3).map(({ title, icon: Icon }, index) => <Button key={title} variant="ghost" className={index === 0 ? "text-primary" : "text-muted-foreground"} onClick={() => index === 0 ? close() : setPanel(title)}><Icon /><span>{title === "Pro workbench" ? "Workbench" : title}</span></Button>)}</nav>

      <AnimatePresence>{(lesson || panel) && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}><motion.section role="dialog" aria-modal="true" aria-label={lesson?.title ?? panel ?? "Overview"} className="lesson-modal" initial={{ y: 35, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 35, opacity: 0 }} transition={{ type: "spring", stiffness: 340, damping: 30 }} onClick={event => event.stopPropagation()}><Button variant="ghost" size="icon" className="modal-close" aria-label="Close dialog" onClick={close}><X /></Button>
        {lesson ? <>
          <span className="modal-symbol">{selected !== null && selected > completed ? <LockKeyhole /> : <Wrench />}</span><div className="eyebrow">UNIT 1 · LESSON {(selected ?? 0) + 1}</div><h2>{lesson.title}</h2><p className="modal-description">{lesson.subtitle}</p>
          <div className="lesson-details"><span><Clock3 /> {lesson.minutes} min</span><span><Zap /> +15 XP</span><span><BookOpen /> Foundations</span></div>
          <div className="tools-list"><h3>YOUR TOOLKIT</h3><div>{lesson.tools.map(tool => <span key={tool}><Wrench size={13} />{tool}</span>)}</div></div>
          <div className="safety-warning"><ShieldCheck /><p>{lesson.warning}</p></div>
          {selected !== null && selected > completed ? <><p className="locked-message">Complete “{lessons[selected - 1]?.title}” to unlock this lesson.</p><Button variant="chunky" className="modal-action" onClick={() => openLesson(completed)}><ArrowLeft /> BACK TO CURRENT LESSON</Button></> : <Button asChild variant="chunky" className="modal-action"><Link to="/lesson/$id" params={{ id: String((selected ?? 0) + 1) }}>{selected !== null && selected < completed ? "REVIEW LESSON" : "START"}<ArrowRight /></Link></Button>}
        </> : <>
          <span className="modal-symbol">{panel === "Pro workbench" ? <Crown /> : panel === "Your hearts" ? <Heart /> : panel === "Your streak" ? <Flame /> : <Sparkles />}</span><h2>{panel}</h2>
          {panel === "Settings" ? <div className="settings-row"><span>Lesson sounds</span><Button variant="outline" role="switch" aria-checked={sound} aria-label="Lesson sounds" onClick={() => setSound(!sound)}>{sound ? <Volume2 /> : <VolumeX />}{sound ? "On" : "Off"}</Button></div> : <p className="modal-description">{panel === "Pro workbench" ? "The hands-on repair simulator is coming in a future version. Your Pro preview badge is " + (pro ? "on." : "off.") : panel === "Practice" ? "Your foundation lessons now include three practice challenges each. Choose a lesson from your path." : panel === "Leaderboard" ? "The repair community leaderboard is coming soon. Every expert starts with lesson one." : panel === "Profile" ? `Repair rookie · ${completed} lessons completed · ${xp} XP · ${gems} Gems this session.` : panel === "Your hearts" ? `${hearts} out of 5 hearts. An incorrect answer costs one heart. If you run out, restart the lesson with five practice hearts.` : panel === "Your gears" ? `120 starter gears · ${gems} Gems earned this session. Gem rewards arrive when you finish a new lesson.` : panel === "Your streak" ? `${completed > 0 ? "1 learning day this session. Keep your repair skills growing!" : "Finish your first lesson to fire up your streak."} Progress and streaks last for this session; daily tracking is not connected yet.` : panel === "Unit guide" ? "Six bite-sized lessons cover tools, safety, phone components, careful opening, and screw organization. Complete each story and challenge to unlock your next step." : "Revise is an educational academy, not a substitute for a verified repair guide. Stop if a battery is swollen or damaged, and seek professional help."}</p>}
          {panel === "Pro workbench" && <Button variant="blue" className="modal-action" onClick={() => setPro(!pro)}><Crown />{pro ? "TURN OFF PRO PREVIEW" : "TURN ON PRO PREVIEW"}</Button>}
          <Button variant="outline" className="modal-action" onClick={close}>BACK TO LEARNING</Button>
        </>}
      </motion.section></motion.div>}</AnimatePresence>
    </div>
  );
}
