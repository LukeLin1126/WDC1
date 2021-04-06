select stu.given_name, stu.family_name, stu.program, sb.subject, sb.faculty
from Enrolments as e
inner join Students stu on e.student_id = stu.student_id
inner join Subjects sb on e.subject_code = sb.subject_code
  where sb.faculty != 'ECMS'
;

