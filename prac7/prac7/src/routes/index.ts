import {Request, Response,NextFunction, Router} from 'express';


// router

const router = Router();

(()=>{
    router.get('/brew',function (req: Request, res: Response, next: NextFunction) {

        const teaResponse = "A delicious cup of tea!";

        if (req.query.drink === "tea") {
            res.send(teaResponse);
        }else if (req.query.drink === "coffee") {
            res.status(418).send();
        } else {
            res.status(400).send();
        }

        return;

   });
})();

// Export the base-router
const baseRouter = Router();
baseRouter.use('/', router);
export default baseRouter;
