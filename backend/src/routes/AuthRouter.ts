import { AuthComponent } from '@/components';
import { Router } from 'express';
import * as jwtConfig from '@/config/middleware/jwtAuth';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.post('/login', AuthComponent.login);

// TODO: 3) Add /logout route

router.post('/logout', jwtConfig.isAuthenticated, AuthComponent.logout)

/**
 * @export {express.Router}
 */
export default router;
