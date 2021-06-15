DROP view if exists recent_customer;
create view recent_customer AS
select DISTINCT c1.customer_id,
                c1.store_id,
                c1.first_name,
                c1.last_name,
                c1.email,
                c1.address_id,
                c1.active,
                c1.create_date,
                c1.last_update,
                r1.rental_date as recent_rental_date
from customer as c1
         inner join rental r1 on c1.customer_id = r1.customer_id
         left outer join rental r2 on c1.customer_id = r2.customer_id

WHERE DATEDIFF(NOW(), r1.rental_date) < 30
  AND (r1.rental_date < r2.rental_date
    or r1.rental_date = r2.rental_date and r1.customer_id < r2.customer_id
    )
;



