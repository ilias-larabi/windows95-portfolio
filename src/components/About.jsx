import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className="about">
      <div className="notepad-menubar">
        <span className="menu-item">File</span>
        <span className="menu-item">Edit</span>
        <span className="menu-item">Search</span>
        <span className="menu-item">Help</span>
      </div>
      
      <div className="notepad-content">
        <div className="notepad-text">
          <h2>About Ilias Larabi</h2>
          <br />
          
          <p><strong>Name:</strong> Ilias Larabi</p>
          <p><strong>Title:</strong> Full Stack Developer & Software Engineering Student</p>
          <p><strong>Location:</strong> Casablanca, Morocco (Remote & On-Site Available)</p>
          <p><strong>Experience:</strong> 2+ Years</p>
          <p><strong>Email:</strong> larabiilias@gmail.com</p>
          <p><strong>Phone:</strong> 0620572294</p>
          <br />
          
          <h3>Professional Background</h3>
          <p>
            I'm a Software Engineering student at EMSI (École Marocaine des Sciences de l'Ingénieur), 
            currently in my final year pursuing a Bachelor's in Software Engineering (3IIR program). 
            With 2+ years of practical and academic programming experience, I've worked on multiple 
            development projects, from management systems to e-commerce websites. My experience spans 
            both frontend and backend development, and I'm passionate about building clean, practical, 
            and scalable digital experiences.
          </p>
          <br />
          
          <h3>Current Focus</h3>
          <p>
            Building full-stack applications with Django and React, and gaining real-world experience 
            through freelance work and internships. I'm particularly interested in creating modern web 
            applications that solve real-world problems with code.
          </p>
          <br />
          
          <h3>Technical Skills</h3>
          <p><strong>Programming Languages:</strong></p>
          <p>• JavaScript, Python, Java, C, C++</p>
          <p>• PHP, SQL, PL/SQL, HTML5, CSS3</p>
          <br />
          
          <p><strong>Frameworks & Libraries:</strong></p>
          <p>• React, Django, Symfony</p>
          <p>• Node.js (beginner level)</p>
          <p>• TypeScript (learning)</p>
          <br />
          
          <p><strong>Databases:</strong></p>
          <p>• MySQL, PostgreSQL, SQLite</p>
          <p>• Oracle Database</p>
          <p>• Database Design & Management</p>
          <br />
          
          <p><strong>Tools & Platforms:</strong></p>
          <p>• Git, GitHub, Visual Studio Code</p>
          <p>• XAMPP, Docker (beginner)</p>
          <p>• Supabase, Vercel, Firebase (basic)</p>
          <br />
          
          <h3>Key Projects & Experience</h3>
          <p><strong>NutsTree E-commerce Website</strong></p>
          <p>• Developed a clean and responsive e-commerce site for organic nut products</p>
          <p>• Technologies: HTML, CSS, JavaScript</p>
          <p>• Live at: https://nutstree.ma/c</p>
          <br />
          
          <p><strong>Document Management System (DocManager)</strong></p>
          <p>• Full-stack system for organizing and managing Word documents</p>
          <p>• Technologies: Django, Django Ninja, React, TypeScript, PostgreSQL</p>
          <p>• Features: Import/export, category management, admin panel</p>
          <br />
          
          <p><strong>Smart Parc – Fleet Management System</strong></p>
          <p>• Digital platform for company vehicle fleet management</p>
          <p>• Technologies: HTML, CSS, JavaScript, PHP, MySQL</p>
          <p>• Features: Vehicle tracking, maintenance, reservations</p>
          <br />
          
          <h3>Education</h3>
          <p><strong>Bachelor's in Software Engineering (3IIR program)</strong></p>
          <p>• EMSI (École Marocaine des Sciences de l'Ingénieur), Casablanca</p>
          <p>• Currently in final year</p>
          <p>• Final Year Project: Service reservation system using HTML/CSS, JavaScript, SQL Server</p>
          <br />
          
          <h3>Current Focus & Interests</h3>
          <p>
            • Building full-stack applications with Django and React<br/>
            • Gaining real-world experience through freelance work and internships<br/>
            • Fitness & Nutrition<br/>
            • Design with Canva<br/>
            • E-commerce & Online Marketing<br/>
            • Learning new tech stacks<br/>
            • Exploring AI tools<br/>
            <br/>
            I'm currently open to new opportunities including internships, freelance projects, 
            and junior full-time roles as a Full Stack Developer, Web Developer, or Software Engineer.
            Let's build something impactful together!
          </p>
        </div>
      </div>
      
      <div className="notepad-statusbar">
        <div className="status-item">Ln 1, Col 1</div>
        <div className="status-item">Windows (CRLF)</div>
        <div className="status-item">UTF-8</div>
      </div>
    </div>
  )
}

export default About
