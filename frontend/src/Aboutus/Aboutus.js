import React from 'react';
import './Aboutus.css';
import { ReactComponent as M1 } from '../components/images/m1.svg';
import { ReactComponent as W1 } from '../components/images/w1.svg';
import { ReactComponent as M2 } from '../components/images/m2.svg';
import { ReactComponent as M3 } from '../components/images/m3.svg';

const teamMembers = [
  { name: '22 박주형', role: 'Frontend', department: '동국대학교 컴퓨터공학과', image: M1 },
  { name: '22 김유민', role: 'Frontend', department: '동국대학교 컴퓨터공학과', image: W1 },
  { name: '22 최우성', role: 'Backend', department: '동국대학교 컴퓨터공학과', image: M2 },
  { name: '20 김효범', role: 'Backend', department: '동국대학교 컴퓨터공학과', image: M3 },
];

export default function About() {
  return (
    <div className="container3">
      <div className="team-section">
        <div className="team-row"> <div className="role-label">Frontend</div>
          {teamMembers.filter(member => member.role === 'Frontend').map((member, index) => (
            <div key={index} className="team-member">
              <member.image className="avatar" />
              <p className="department">{member.department}</p>
              <p className="name">{member.name}</p>
            </div>
          ))}
        </div>
       
        <div className="team-row"><div className="role-label">Backend</div>
          {teamMembers.filter(member => member.role === 'Backend').map((member, index) => (
            <div key={index} className="team-member">
              <member.image className="avatar" />
              <p className="department">{member.department}</p>
              <p className="name">{member.name}</p>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
