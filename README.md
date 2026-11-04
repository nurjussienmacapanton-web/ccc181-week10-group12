# CCC181 Week 10: CampusConnect Mobile-First Login Page

React + TypeScript starter for the Week 10 group activity. The page is already
built. Your group's job is the **mobile-first CSS** and the **GitHub teamwork**.

## Run it

```bash
npm install
npm run dev          # open the local URL it prints
npm run dev:phone    # same, but your phone (same Wi-Fi) can open the Network URL
npm run build        # must finish with no errors before you submit
```

## Rules

- Edit only the CSS files in `src/styles/` (one member = one file). Do not edit `reset.css`.
- Plain CSS only. No Tailwind, Bootstrap, Material UI, styled-components, or any UI library.
- Phone styles first (no media query), then `min-width` queries only. Never `max-width`.
- Do not edit the `.tsx` files or rename classes. If you must, tell the group first.

## Group information (fill in)

| Item | Your answer |
| --- | --- |
| Group number | |
| Section | |
| Repository URL | |

## Members (each member fills in their own row in their own commit)

| Member | Name | GitHub username | CSS file | What I did |
| --- | --- | --- | --- | --- |
| 1 (leader) | Nur Jussien P. Macapanton | nurjussienmacapanton-web | `base.css and nav.css` | Created base and navigation styles |
| 2 | Dana C. Amancio | DnxAmancio | `form.css` | Created responsive login form styling and completed README documentation |


## Experiment 0: the page without the viewport tag

What did the page look like in DevTools phone mode **before** adding the viewport meta tag?
What changed **after** adding it?

Before adding the viewport meta tag, the page looked very small and squeezed because the browser used a desktop-sized layout and scaled it down to fit the phone screen.So,after adding the viewport meta tag, the page adjusted to the actual screen width. The text, navigation, welcome section, and login form became larger and easier to read. The viewport tag made the webpage display properly on mobile devices instead of shrinking the desktop layout.

## DevTools test results

| Width | What must be true | Pass? |
| --- | --- | --- |
| 360 px | 1 column. Nav links stacked and 48px tall. Options and buttons stacked. Footer in 1 column. No sideways scrollbar. | Pass |
| 768 px | Nav in one row (brand left, links right). Checkbox and link in one row. Two buttons side by side. | Pass |
| 1024 px | Brand panel and login card side by side. Footer in 3 columns. Heading is larger. | Pass |
| 1280 px | Content centered and stops at 1200px. | Pass |

### Breakpoints I observed

Using **Show media queries** and dragging slowly from 360 px to 1280 px, the layout changed at these exact widths:

Using Show media queries and dragging slowly from 360 px to 1280 px, the layout changed at these widths:
- 768 px – Navigation changed from stacked to horizontal.
- 1024 px – Welcome panel and login card changed to a side-by-side layout, and the footer changed to 3 columns.
- 1280 px – Content became centered with a maximum width of 1200 px.
No width looked broken. The layout adjusted properly and remained responsive.

Screenshots are in `screenshots/` as `360.png`, `768.png`, `1024.png`, `1280.png`.

## What our group learned (leader writes this last)

Our group learned how to make a website responsive using CSS media queries. We understood how layouts change depending on the screen size of different devices, such as mobile phones, tablets, and desktops. We also learned how to use the viewport meta tag, adjust navigation bars, organize content, and test different screen widths using Chrome DevTools. Through this experiment, we learned the importance of responsive web design in creating a website that is easy to use on any device.

Aside from web development, we gained experience using Git and GitHub for teamwork. We learned how to create branches, commit changes, push our work, and submit Pull Requests for review.

Overall, this activity helped us improve our coding skills, problem-solving abilities, and collaboration as a team.
