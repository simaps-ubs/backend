import { container } from 'tsyringe';

import IHashProvider from './HashProvider/model/IHashProvider';
import BCryptProvider from './HashProvider/implamentations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptProvider);
