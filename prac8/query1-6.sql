select title
from film
left join inventory i on film.film_id = i.film_id
where film.film_id NOT IN (
    select film_id
    from inventory
    ORDER BY film_id
    )
;
