# Lectures

Sean's Functional Programming Lectures live at <https://seandinwiddie.github.io/lectures/>: a curriculum for functional programming with TypeScript and Redux, from pure functions to monads and modern Redux architecture. The source is the `seandinwiddie/lectures` repository (Jekyll, `baseurl: /lectures`); the list below follows its `_data/curriculum.yml`.

The community pages carry at least one link to a lecture where one fits the page's topic. It is not a rule for every page: a link goes where it helps the reader learn the next thing, in the site's own voice, and it names the lecture rather than saying "click here".

## The lectures

| Level | Lecture | URL |
|---|---|---|
| Beginner | The Simplest FP TypeScript Hello World | https://seandinwiddie.github.io/lectures/the-simplest-fp-ts-hello-world/ |
| Beginner | Basic TypeScript Knowledge | https://seandinwiddie.github.io/lectures/basic-typescript-knowledge/ |
| Beginner | What Is a Function? | https://seandinwiddie.github.io/lectures/what-is-a-function/ |
| Beginner | Basic Functional Programming TypeScript Knowledge | https://seandinwiddie.github.io/lectures/basic-functional-programming-knowledge/ |
| Beginner | ES6+ Features for Functional Programming | https://seandinwiddie.github.io/lectures/es6+-features-for-functional-programming/ |
| Intermediate | TypeScript and Functional Programming | https://seandinwiddie.github.io/lectures/typescript-and-functional-programming/ |
| Intermediate | Redux Standard Patterns and Functional Programming | https://seandinwiddie.github.io/lectures/redux-standard-patterns-and-functional-programming/ |
| Intermediate | Redux Toolkit and Functional Programming | https://seandinwiddie.github.io/lectures/redux-toolkit-and-functional-programming/ |
| Intermediate | Functional Composition | https://seandinwiddie.github.io/lectures/functional-composition/ |
| Advanced | Monads in Functional Programming | https://seandinwiddie.github.io/lectures/monads-in-functional-programming/ |
| Advanced | Advanced Monad Transformers | https://seandinwiddie.github.io/lectures/advanced-monad-transformers/ |
| Advanced | Category Theory Fundamentals | https://seandinwiddie.github.io/lectures/category-theory-fundamentals/ |
| Intermediate | Practical Applications of Functional Programming | https://seandinwiddie.github.io/lectures/practical-applications-of-functional-programming/ |
| Advanced | Performance Optimization Techniques | https://seandinwiddie.github.io/lectures/performance-optimization-techniques/ |
| Intermediate | Functional Programming in Other Languages | https://seandinwiddie.github.io/lectures/functional-programming-in-other-languages/ |
| Advanced | Functional Programming Maintenance Strategy | https://seandinwiddie.github.io/lectures/functional-programming-maintenance-strategy/ |
| Advanced | Redux Toolkit and RTK Query Best Practices | https://seandinwiddie.github.io/lectures/redux-toolkit-and-rtk-query-best-practices/ |
| Advanced | Modern Redux Architecture Patterns | https://seandinwiddie.github.io/lectures/modern-redux-architecture-patterns/ |

## Where they fit on the community pages

Linked since pass 6: the community hub (the lectures' index), the curriculum, the Redux page (Redux Toolkit and Functional Programming, and Modern Redux Architecture Patterns) and the FRP lesson on applying it to modules (Redux Toolkit and Functional Programming, and Modern Redux Architecture Patterns, which carries on where the course ends).

Linked in pass 8: Module 3 (Redux Standard Patterns and Functional Programming, `#the-one-way-dataflow`), Event streams (the same lecture, `#model-events-and-transitions-with-a-slice`) and BDD and Unit Testing (Modern Redux Architecture Patterns, `#testing-architecture`). The anchors are checked against the lectures repository's headings (kramdown ids).

Linked in pass 9, at Sean's direction to link the lectures all through the community: every lesson carries at least one lecture link except Identifying User Needs and Collaborative Sessions, where none fits yet. The API lesson links Functional Programming in Other Languages (`#functional-core-imperative-shell`, `#cross-language-conformance-tests`), What Is a Function? (`#push-effects-to-the-edges`) and Redux Toolkit and RTK Query Best Practices (`#generate-endpoints-from-openapi`). The rest, by page:

- **Course overview:** Introduction and Curriculum → The Simplest FP TypeScript Hello World; User Stories → Redux Toolkit and Functional Programming `#setter-style-actions-instead-of-event-style-actions`; BDD → What Is a Function? `#pure-functions`; FRP → Basic Functional Programming TypeScript Knowledge `#core-concepts`; Course Outline → Basic Functional Programming TypeScript Knowledge and Redux Toolkit and RTK Query Best Practices.
- **Module 1:** Welcome → What Is a Function?; User-Centric Design → Functional Programming Maintenance Strategy; Defining → Redux Toolkit and Functional Programming `#test-transitions-and-derivations`; Capturing → Functional Programming Maintenance Strategy `#refactoring-guidelines`; Translating → What Is a Function? `#push-effects-to-the-edges`; Writing Clear → Basic Functional Programming TypeScript Knowledge `#3-use-descriptive-names`; Practical Exercises → the same lecture's `#exercise`.
- **Module 2:** the module page → Redux Toolkit and Functional Programming `#test-transitions-and-derivations`; Introduction to BDD → What Is a Function? `#benefits-of-pure-functions`; Principles → Functional Composition `#test-the-contract`; How BDD Aligns → Redux Standard Patterns and Functional Programming `#model-events-and-transitions-with-a-slice`; Gherkin → Practical Applications of Functional Programming `#test-laws-and-boundaries`; Writing BDD Scenarios → Redux Toolkit and RTK Query Best Practices `#event-oriented-slices`; …for Software Modules → Redux Toolkit and Functional Programming `#organize-by-feature`; Real-World Cases → Practical Applications `#represent-expected-failure-as-plain-data`; Reviewing as a Group → Modern Redux Architecture Patterns `#testing-architecture`; BDD Testing Framework → Redux Toolkit and RTK Query Best Practices `#testing`.
- **Module 3:** Introduction to FRP → What Is a Function? `#push-effects-to-the-edges`; Event streams → Basic Functional Programming TypeScript Knowledge `#every-for-loop-is-a-fold-in-disguise`; Fundamentals → Functional Composition `#pipe-and-compose`; Discover → Modern Redux Architecture Patterns `#side-effect-architecture`; Apply FRP → the same lecture's `#a-decision-procedure-for-one-piece-of-state`.
- **Off the path:** the hub → What Is a Function? and Modern Redux Architecture Patterns; the P.S. note → Redux Toolkit and RTK Query Best Practices `#create-one-api-per-base-url`.

Every anchor is checked against the lectures repository's headings with its own `slugify`.


A starting map for the copy loop; it adds links a few pages at a time, never all at once.

- **The community hub and the curriculum:** the lectures' index.
- **Functional reactive programming** (the FRP module and its lessons, event streams): What Is a Function?, Functional Composition, Basic Functional Programming TypeScript Knowledge; Practical Applications of Functional Programming for applying FRP to software modules.
- **Redux** (the post on coding Redux apps): Redux Toolkit and Functional Programming, Modern Redux Architecture Patterns, Redux Toolkit and RTK Query Best Practices.
- **Behavior-driven development and unit testing:** What Is a Function? (pure functions are the easiest to test), where the page is about testing code.
- **User stories:** only where a page turns to code; most user-story pages have no lecture that fits, and that's fine.

The lectures' site can't be fetched from this environment (its network blocks github.io), so links are checked against the repository's config and curriculum file.
