# Practical 7 – Data Visualization
### Analytics Dashboard Report

---

## Aim

The aim of this practical is to implement an interactive data visualization dashboard using React, by integrating two industry-standard charting libraries — **Recharts** and **Chart.js** (via react-chartjs-2) — to display sales analytics data through various chart types.

---

## Objectives

- To clone and set up a pre-configured React project as the base for the dashboard.
- To install and configure Recharts and Chart.js alongside their required dependencies.
- To implement four distinct chart types — Line, Pie, Bar, and Area — each suited to a different type of data analysis.
- To structure the application using modular, reusable React components for each chart.
- To correctly import and consume pre-existing sales data from the project's data files.
- To compose all chart components into a unified analytics dashboard in `App.jsx`.

---

## Background

Data visualization is a critical aspect of modern web applications, particularly in analytics and reporting contexts. Raw data presented in tables or plain text is often difficult to interpret at a glance. Charting libraries abstract away the complexity of rendering visual data, allowing developers to focus on what the data communicates rather than how to draw it.

**Recharts** is a composable charting library built specifically for React, using SVG under the hood. It follows a declarative component-based approach where each part of a chart — axes, tooltips, legends, lines — is its own React component, making it highly flexible and easy to customize.

**Chart.js** is one of the most widely used JavaScript charting libraries, known for its simplicity and wide range of chart types. **react-chartjs-2** is a React wrapper around Chart.js that allows it to be used with React's component model. Unlike Recharts, Chart.js renders onto an HTML `<canvas>` element and requires manual registration of its components before use.

**date-fns** is a lightweight JavaScript library used for parsing and formatting dates, used here to format raw date strings in the customer acquisition data into readable month/year labels.

---

## Theory

**Recharts — Declarative SVG Charts:**
Recharts wraps each chart element as a React component. A `<LineChart>` contains `<Line>`, `<XAxis>`, `<YAxis>`, `<Tooltip>` and so on as children. The `<ResponsiveContainer>` wrapper ensures the chart scales fluidly with its parent element's dimensions.

**Chart.js — Canvas-Based Charts:**
Chart.js requires all used components (scales, elements, plugins) to be explicitly registered via `ChartJS.register()` before rendering. This is a tree-shaking optimization — only the parts you register are bundled. Data is passed as a structured object with `labels` and `datasets` arrays, built inside a `useEffect` hook to ensure it runs after the component mounts.

**useEffect for Data Preparation:**
In the Chart.js components, `useEffect` is used to transform the raw imported data into the format Chart.js expects, then store it in local state via `useState`. This pattern ensures the chart receives properly formatted data on first render.

**Stacked Charts:**
The Customer Acquisition bar chart uses stacking, where multiple datasets are layered on top of each other per label, making it easy to compare parts of a whole over time.

**Area Charts:**
The Weekly Visitors chart uses Chart.js's `Line` component with `fill: true`, which shades the area beneath the line — turning a standard line chart into an area chart, useful for visualizing volume over time.

---

## Implementation Steps

**Step 1: Clone and Set Up the Repository**

The base project was cloned from the provided GitHub repository using `git clone`. Dependencies were installed with `npm install`, followed by installing the required charting packages — `recharts`, `chart.js`, `react-chartjs-2`, and `date-fns`.

📸 *Screenshot: Terminal showing successful completion of both `npm install` commands.*

---

**Step 2: Setting Up the Folder Structure**

A `components` folder was created inside the `src` directory to house all four chart components. The existing `data/salesData.js` file from the cloned repository was confirmed to be in place, as all components import their data from it.

📸 *Screenshot: VS Code file explorer showing the `src/components/` folder with all four `.jsx` files visible alongside the `data/` folder.*

---

**Step 3: Creating the Monthly Sales Chart**

`MonthlySalesChart.jsx` was created using Recharts. A `<LineChart>` with three `<Line>` components was built — one each for Sales, Profit, and Target. The Target line uses a dashed stroke to visually distinguish it. A `<ResponsiveContainer>` wraps the chart to make it fluid.

📸 *Screenshot: `MonthlySalesChart.jsx` open in VS Code.*

---

**Step 4: Creating the Product Category Chart**

`ProductCategoryChart.jsx` was created using Recharts' `<PieChart>`. A `<Pie>` component maps over the `productSales` data and renders a `<Cell>` for each entry, each assigned a color from a predefined `COLORS` array. Percentage labels are displayed directly on the slices.

📸 *Screenshot: `ProductCategoryChart.jsx` open in VS Code.*

---

**Step 5: Creating the Customer Acquisition Chart**

`CustomerAcquisitionChart.jsx` was created using Chart.js via react-chartjs-2. The required Chart.js modules were registered manually using `ChartJS.register()`. Inside a `useEffect`, the raw `customerData` was transformed — dates were formatted using `date-fns` and datasets for new and returning customers were structured. The chart is rendered as a stacked bar chart.

📸 *Screenshot: `CustomerAcquisitionChart.jsx` open in VS Code.*

---

**Step 6: Creating the Weekly Visitors Chart**

`WeeklyVisitorsChart.jsx` was created using Chart.js's `<Line>` component with `fill: true` to produce an area chart effect. The `Filler` plugin was registered to enable the fill. Week labels were generated dynamically from the data and a custom tooltip callback was added to format the visitor numbers with locale-appropriate formatting.

📸 *Screenshot: `WeeklyVisitorsChart.jsx` open in VS Code.*

---

**Step 7: Updating App.jsx**

All four chart components were imported into `App.jsx` and arranged in a grid layout inside card sections, each with a descriptive heading. This composes the final analytics dashboard.

📸 *Screenshot: `App.jsx` open in VS Code showing all four imports and the grid layout.*

---

**Step 8: Running and Testing the Dashboard**

The application was started with `npm run dev` and opened in the browser. All four charts were verified to render correctly with their respective data, tooltips, legends, and responsive behavior.

📸 *Screenshot 1: The full dashboard in the browser showing all four charts.*
📸 *Screenshot 2: Hovering over the Monthly Sales line chart showing the tooltip with formatted dollar values.*
📸 *Screenshot 3: Hovering over the Pie chart showing the tooltip with percentage values.*

---

## Difficulties Faced and How I Overcame Them

### 1. Vulnerability warnings during npm install
After running `npm install recharts chart.js react-chartjs-2 date-fns`, the terminal displayed 16 vulnerabilities. This was initially concerning and unclear whether it would affect the project.

**Solution:** Ran `npm audit fix` to resolve what could be automatically fixed. The remaining vulnerabilities were in development dependencies only and did not affect the running application. The project proceeded without issues.

---

### 2. Chart.js components not rendering — forgot to register
When first building the `CustomerAcquisitionChart`, the chart rendered as a blank canvas with no error message. This was confusing since the code appeared correct.

**Solution:** After investigating, the issue was that Chart.js requires all components to be explicitly registered via `ChartJS.register()` before use. Once `CategoryScale`, `LinearScale`, `BarElement`, `Tooltip`, `Legend`, and `Title` were all added to the register call, the chart rendered correctly.

---

### 3. Area chart not filling — missing Filler plugin
In the `WeeklyVisitorsChart`, setting `fill: true` on the dataset did not produce the shaded area effect as expected. The chart appeared as a plain line with no fill.

**Solution:** The `Filler` plugin from `chart.js` needs to be separately imported and included in `ChartJS.register()`. Adding it to the registration list immediately resolved the issue.

---

### 4. Components placed in the wrong folder
Initially the component files were created in the root of the project rather than inside `src/components/`, which caused import errors in `App.jsx` since the paths pointed to `./components/` relative to `src`.

**Solution:** Moved all `.jsx` files into `src/components/` to match the import paths used in `App.jsx`. The folder structure was verified in VS Code before running the app again.

---

## Conclusion

This practical successfully demonstrated the implementation of data visualization in a React application using two different charting libraries. Through building the analytics dashboard, it became clear that both Recharts and Chart.js serve the same fundamental purpose but take notably different approaches. Recharts feels more natural in a React environment due to its fully declarative, component-based API, while Chart.js offers greater configurability at the cost of more explicit setup, particularly around component registration and data formatting.

The use of `useEffect` for preparing Chart.js data highlighted an important React pattern — keeping side effects and data transformations separate from the render logic. The practical also reinforced the value of modular component design, as each chart being its own self-contained component made the final `App.jsx` clean and easy to manage.

Overall, this practical provided a strong foundation for building data-driven interfaces, which are increasingly common in real-world web applications across industries such as finance, e-commerce, and healthcare.

---

## References

Chhetri, P. (2025). *Practical 7: Data Visualization.* Course Material. Department of Software Engineering, College of Science and Technology.

Recharts Team. (2023). *Recharts — Redefined chart library built with React and D3.* Retrieved from https://recharts.org

Chart.js Contributors. (2024). *Chart.js Documentation.* Retrieved from https://www.chartjs.org/docs

Aperture Labs. (2023). *react-chartjs-2 Documentation.* Retrieved from https://react-chartjs-2.js.org

Kossovsky, D. (2023). *date-fns — Modern JavaScript date utility library.* Retrieved from https://date-fns.org

Syangche. (2024). *Data-Visualisation — Base project repository.* GitHub. Retrieved from https://github.com/syangche/Data-Visualisation

Mozilla Developer Network. (2024). *Canvas API.* MDN Web Docs. Retrieved from https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
