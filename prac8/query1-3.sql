select c.first_name, c.last_name, rental_date
from rental
inner join customer c on rental.customer_id = c.customer_id
ORDER BY rental_date
LIMIT 1
;
