# 3D Robotic Arm Linkage Project

# Robotic Arm Dynamics & Kinematics Framework  
**Oregon State University — Intermediate Dynamics / Computational Dynamics**  

This project was developed as a **semester-long assignment** during my Intermediate Dynamics and Computational Dynamics coursework at Oregon State University. The project structure and assignment scaffolding were designed by **Professor Ross Hatton**, who provided preformatted prompts that outlined what each stage of the code should accomplish. Within this framework, I implemented and extended the computational methods, building a **comprehensive MATLAB toolbox** for modeling, simulating, and visualizing robotic arms — including both **planar and 3D systems** with **revolute and prismatic joints**.  

The work integrates:  
- **Vector and matrix utilities** for linear algebra foundations.  
- **Kinematic chain builders** for assembling robotic arms.  
- **Dynamic simulation modules** leveraging Euler–Lagrange equations.  
- **Visualization and animation tools** for trajectory tracing and motion under forces.  
- **Assignment deliverables** applying these tools to real case studies.  

This project reflects my ability to blend **mechanical engineering principles** (dynamics, kinematics, vibrations) with **computational methods** (MATLAB, symbolic manipulation, numerical integration) to produce reusable engineering tools.  

---

## Core Vector & Rotation Utilities
These functions form the mathematical backbone of the framework:  

- `vector_set_rotate.m` — Rotates vectors by rotation matrices.  
- `vector_set_extend.m` — Extends or scales vector sets.  
- `vector_set_difference.m` — Computes differences between endpoints and reference points.  
- `vector_set_cumulative_sum.m` — Builds link endpoints by cumulative vector sums.  
- `Rz.m`, `Ry.m`, `Rx.m` — Standard 3D rotation matrices.  
- `R_planar.m` — 2D rotation matrix.  
- `threeD_rotation_set.m` / `planar_rotation_set.m` — Builds sets of rotations from joint inputs.  
- `rotation_set_cummulative_product.m` — Cascades joint rotations through a chain.  
- `orthonormal_basis_from_vector.m` — Generates orthogonal bases, essential for prismatic rail geometry.  

---

## Kinematic Chain Builders
Used to construct robot arm geometry in both **planar** and **3D** space:  

- **3D Links**:  
  - `threeD_robot_arm_links.m`  
  - `threeD_robot_arm_links_prismatic.m`  
  - `threeD_robot_arm_endpoints.m`  
  - `threeD_joint_axis_set.m`  

- **Planar Links**:  
  - `planar_robot_arm_links.m`  
  - `planar_robot_arm_links_prismatic.m`  
  - `planar_robot_arm_endpoints.m`  
  - `planar_build_links_prismatic.m`  

- **Placement & Drawing**:  
  - `place_links.m`, `place_links_3D.m` — Position local link geometry in world coordinates.  
  - `threeD_draw_links.m`, `draw_links.m` — Generate arm illustrations.  
  - `threeD_update_links.m` — Update animated arms in real time.  

---

## Revolute vs. Prismatic Joints

A central feature of robotic arms is the type of **joint** connecting each link.  
This project supports both **revolute** and **prismatic** joints:  

- **Revolute Joint (Rotational):**  
  - Represents a hinge-like connection.  
  - The link **rotates** about a fixed axis (x, y, or z).  
  - Kinematically modeled using rotation matrices (`Rz`, `Ry`, `Rx`).  
  - The Jacobian column for a revolute joint is the **cross product** of the joint axis and the vector from the joint to the end-effector.  
  - Common in robotic manipulators, elbows, and wrists.  

- **Prismatic Joint (Translational):**  
  - Represents a sliding connection.  
  - The link **extends or retracts** linearly along an axis.  
  - Modeled by **adding an extension** to the link vector in the axis direction.  
  - The Jacobian column for a prismatic joint is the **axis vector itself**, since motion is pure translation.  
  - Common in linear actuators, telescoping arms, or sliding rails.  

In this framework, revolute joints define **rotations**, while prismatic joints define **translations**, allowing for simulation of hybrid robotic arms that mix hinge-like and sliding elements.  

---

## Jacobian & Kinematics
These functions enable velocity and trajectory control:  

- `arm_Jacobian.m` — Revolute Jacobian for end-effector velocity.  
- `arm_Jacobian_with_rotation.m` — Extended Jacobian including rotations.  
- `arm_Jacobian_prismatic.m` — Mixed revolute–prismatic Jacobian.  
- `arm_Jacobian_in_link_frame.m` — Jacobian expressed in local coordinates.  

---

## Dynamics & Simulation
Full dynamic modeling with Euler–Lagrange formalism:  

- `chain_inertia_matrix.m` / `link_ineratia_matrix.m` — System and link inertia.  
- `matrix_derivative.m` — Symbolic/numeric differentiation of inertia matrices.  
- `CoriolisCentrifugal.m` — Coriolis and centrifugal forces.  
- `gravitational_moment.m` — Gravity loading.  
- `joint_friction.m` — Simple frictional torque model.  
- `EulerLagrange_trajectory.m` — Governing ODE for dynamics.  
- `EulerLagrange_acceleration.m` — Explicit acceleration form.  
- `follow_trajectory.m` / `follow_trajector.m` — Controller for path following.  

---

## Assignment Applications
These assignment deliverables demonstrate how the framework was applied to specific engineering problems:  

- **Path Tracing**  
  - `ME317_Assignment_trace_circle.m` — Rigid 3D arm tracing a circle.  
  - `Trace_circle_prismatic.m` — Prismatic arm rendering the same trajectory.  

- **Dynamic Simulation**  
  - `ME317_Assignment_falling_arm.m` — Rigid 3D arm falling under gravity.  
  - `ME317_Assignment_falling_arm_prismatic.m` — Falling arm with prismatic joints.  

- **Planar Arm Drawing**  
  - `ME317_Assignment_draw_planar_arm.m`  
  - `ME317_Assignment_draw_planar_arm_with_Jacobian.m`  
  - `ME317_Assignment_draw_planar_arm_individual_links.m`  
  - `ME317_Assignment_draw_planar_arm_individual_links_prismatic.m`  

- **3D Arm Drawing**  
  - `ME317_Assignment_draw_3D_arm.m`  
  - `ME317_Assignment_draw_3D_arm_with_Jacobian.m`  
  - `ME317_Assignment_draw_3D_arm_individual_links.m`  
  - `ME317_Assignment_draw_3D_arm_individual_links_prismatic.m`  

---

## Supporting Tools
- `circle_x.m` — Parametric circle generator for path tracing.  
- `columns_to_cells.m` — Data wrangling utility.  
- `build_links.m` — Helper for constructing local link geometries.  
- `create_subaxes.m` — Multi-plot visualization manager.  

---

## MATLAB Add-Ons & Toolboxes Required
To run this project in MATLAB, the following toolboxes and add-ons are required or recommended:  

- **MATLAB Base Environment** — Core language and graphics.  
- **Symbolic Math Toolbox** *(parent add-on for Jacobian functions)* — Required for symbolic Jacobian derivations (`arm_Jacobian.m`, `arm_Jacobian_prismatic.m`, `matrix_derivative.m`).  
- **Adaptive Robust Numerical Differentiation (Version 1.6, 166 KB) by John D’Errico** — MATLAB File Exchange add-on used for robust numeric differentiation in `matrix_derivative.m`.  
- **MATLAB ODE Suite** (built-in) — For solving dynamic equations with `ode45`.  
- **MATLAB Graphics & Animation Tools** (built-in) — For visualization, 3D plotting, and MP4/GIF export.  
- **(Optional) Robotics System Toolbox** — Not strictly required, but helpful for comparing with built-in robotics functions.  

---

## Outcomes & Skills Demonstrated
- Implemented a **modular robotics toolkit** in MATLAB within a structured academic framework.  
- Integrated **vector calculus, dynamics, and kinematics** in a unified framework.  
- Produced **animations (GIF/MP4)** for clear visualization of robotic motion.  
- Applied **Euler–Lagrange methods** to simulate dynamics under gravity and friction.  
- Worked with **Jacobian-based trajectory control** for both revolute and prismatic arms.  
- Demonstrated ability to work across **planar and 3D systems** with reusable code modules.  

---

## Reflection
The framework I built was guided by **preformatted assignment structures** that outlined the problem-solving objectives for each stage. These structures and the overall project design were developed by **Professor Ross Hatton** as part of the Oregon State University Intermediate Dynamics / Computational Dynamics course. Within this framework, my role was to **implement, extend, and integrate** the required functionality — from vector utilities to full Euler–Lagrange dynamic simulations — into a consistent MATLAB toolbox.  

While the modular, general-purpose organization was **required by the assignment format**, building within that structure helped me appreciate the value of **scalable, reusable engineering tools** and how they simplify testing, extension (e.g., prismatic joints, falling dynamics), and visualization across multiple assignments.  

Beyond the technical growth, this project strengthened my ability to:  
- Translate **mechanical engineering theory** into working computational models.  
- Debug and validate complex systems by breaking them into smaller, testable functions.  
- Use **visualization and simulation** not just for checking correctness, but also for communicating mechanical system behavior effectively.  
- Maintain clear documentation and consistent coding practices in a structured, academic environment.  


---

## Download: Robot Arm In.Dynamics Toolbox

You can download the complete MATLAB toolbox, including all scripts, utilities, and assignment deliverables, as a ZIP archive:

**[Download Robot Arm In.Dynamics (ZIP)](/portfolio-webpage/assets/docs/robotic-arm-project/Robot%20Arm%20In.Dynamics.zip)**

This archive contains:
- All MATLAB source files and utilities described above
- Example assignment scripts and test cases
- Documentation and usage instructions

Unzip and add the folder to your MATLAB path to get started. See the project documentation for details on requirements and usage.

---

Looking forward, I see this project as a foundation for advanced work in **robotics, aerospace mechanisms, and dynamic system design**, where the same skills — modular coding, mathematical modeling, and physical intuition — are essential for solving real-world engineering problems.
