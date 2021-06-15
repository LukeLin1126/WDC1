select sum(length) as 'total number of minutes'
from film
where film_id IN (
    select film_id
    from film_actor
    where film_actor.actor_id = (
        select actor.actor_id
        from actor
        where first_name = 'ANGELA'
          And last_name = 'WITHERSPOON'
    )
)
;
