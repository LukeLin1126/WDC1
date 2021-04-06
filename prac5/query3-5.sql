select stu.given_name,stu.family_name,e.mark
from Enrolments as e,
     Subjects as sb,
     Students as stu
where e.mark < 50
  and stu.student_id = e.student_id
  and sb.subject_code = e.subject_code;
;
