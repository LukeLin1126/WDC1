select stu.given_name, stu.family_name
from Enrolments as e,
     Subjects as sb,
     Students as stu
where sb.subject = 'Web and Database Computing'
  and stu.student_id = e.student_id
  and sb.subject_code = e.subject_code;
;
