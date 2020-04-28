import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';

const useStores = () => {
  return useContext(MobXProviderContext)
}

export default useStores;