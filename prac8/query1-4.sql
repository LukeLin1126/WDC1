select a.address
from store
left join address a on a.address_id = store.address_id
left join inventory i on store.store_id = i.store_id
where film_id IN (
    select f.film_id from inventory left join film f on inventory.film_id = f.film_id
    where f.title = 'TWISTED PIRATES'
    GROUP BY store_id
    )
GROUP BY i.store_id
;


