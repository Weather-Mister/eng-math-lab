# Lessons 17–25 review

Reviewed against the supplied O’Neil SI 8th-edition text and the 2026–27 ME2001-02 course outline. Textbook section numbering differs from the outline; the existing crosswalk is retained. Original problems are identified separately from numbered textbook exercises.

| Lesson | Scope | Corrections and explanation improvements |
| --- | --- | --- |
| 17 | Vectors, lines, planes, subspaces, bases | Define lengths and unit vectors before projections; state zero-vector exceptions, distinct-point requirement, right-hand orientation, exact line/plane intersection, and the zero-subspace basis. Explain unique basis coordinates. |
| 18 | Orthogonality, projections, matrices | Give the general Gram–Schmidt step, dependent-input handling and normalization; prove the closest-point property; define special matrices and transpose rules. Distinguish walk counts from random-walk probabilities. |
| 19 | Elimination, rank, nullity | Correct the description of reducing an augmented system; explain skipping unusable columns, numerical pivoting, row versus column spaces, and coefficient versus augmented rank. |
| 20 | Linear systems and solution sets | Correct the claim that particular solutions are never unique: uniqueness holds exactly when the null space is zero. Define underdetermined systems without confusing equation count with consistency. Show missing reduction/solution steps. |
| 21 | Inverses, determinants, Cramer’s rule | Supply the requested augmented inverse steps; distinguish a minor determinant from its submatrix; state cofactor sums, determinant rules and inverse order. Label the original Cramer example accurately. |
| 22 | Eigenpairs and diagonalization | Cover zero eigenvalues, real versus complex diagonalization, repeated but diagonalizable eigenvalues, multiplicity conditions, and the definitions/properties of orthogonal, unitary, Hermitian and skew-Hermitian matrices. |
| 23 | Matrix ODEs and phase portraits | Make the initial-condition problem self-contained; derive the real solutions from a complex eigenvector; qualify circular-motion statements in general coordinates; cover zero eigenvalues and defective nodes. |
| 24 | Project presentations | Restore the report’s requirement for five complementary verification checks and at least two course techniques. Distinguish full report evidence from the selection shown in the six-minute talk. Preserve the independent-work-before-assessed-AI sequence. |
| 25 | Cumulative review | Include the outline’s contingency make-up caveat; state zero-state/causal response and interval assumptions; replace repeated Gram–Schmidt and Cramer data with fresh problems. |

Shared fixes:

- Published lessons display **Available now** based on their actual content, rather than showing **Ready to fill** for every lesson except the last loaded file.
- Original transfer exercises and presentation rehearsals have explicit visible practice labels. They no longer inherit the renderer’s default “O’Neil book mastery” heading.
- The 29 quizzes have balanced correct-answer positions (10 / 9 / 10); correct answer text and explanations are preserved or clarified.
- Updated asset versions ensure returning browsers request the corrected lesson files.
- Existing unit IDs and the number/order of units and lesson groups are retained. Added teaching screens can shift screen positions within a group; saved notes and whiteboard storage are not migrated.

## Verification

`node tests/lesson17-25-content.mjs` checks all 252 lesson screens, 143 practice boards, 29 quizzes, provenance, TeX delimiters, and 32 independent groups of numerical/algebraic checks. Calculations include row reductions, inverses, determinants, Cramer systems, null vectors, eigenpairs, diagonalizations, fundamental-matrix ODE residuals and review recurrences.

The existing Lesson 11–15 content checks remain in the audit. Browser checks in `tests/notation-browser.mjs` cover Lesson 11–25 typesetting. `tests/lesson17-25-browser.mjs` additionally renders every Lesson 17–25 screen at desktop and mobile widths, reveals worked solutions, checks incorrect-answer feedback and continuation, checks provenance/availability labels, and detects page overflow and JavaScript/MathJax errors. Both content and browser checks run on pull requests and on main.

This is an evidence-based correction pass, not a guarantee that educational content can never contain another error. Instructor announcements and the separate project brief remain authoritative for course changes and detailed assessment requirements.
