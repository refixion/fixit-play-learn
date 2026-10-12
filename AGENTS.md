<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## App architecture
- Keep the first-version Learn experience on the index route, with lesson content in a separate browser-safe module so the learning path and overview share one source of truth.
- Use the shared Button component for interactive controls and global semantic tokens for the playful visual system.
- Keep first-version learner progress in React session state; this version does not claim account-backed persistence.
