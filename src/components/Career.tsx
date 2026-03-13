import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Cloud - DevOps Intern</h4>
                <h5>CloudDevOpsHub</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Executed cloud-native projects using AWS, Azure, GCP, Kubernetes, and Terraform.
              Built GitHub-Jenkins CI/CD pipelines with Docker for scalable deployments, and
              integrated DevSecOps practices reducing manual efforts by 60%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Bachelor of Commerce (BCOM)</h4>
                <h5>Kisan Veer Mahavidyalaya</h5>
              </div>
              <h3>PRESENT</h3>
            </div>
            <p>
              Currently in 2nd year. Alongside my B.Com studies, I built technical expertise
              in Python, Linux fundamentals, Networking, DBMS, and version control (Git).
              Gained hands-on exposure to application deployment, server configuration, and automation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
