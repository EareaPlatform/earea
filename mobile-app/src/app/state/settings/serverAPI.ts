import {fetchService} from '../../../services/fetch';
import {getUrl} from '../../../constants/serverConfigs';

const getSettingsUrl = 'getSettings';
const setSettingsUrl = 'setSettings';

const getSettings = async (): Promise<{settings: UserSettings}> => {
  try {
    return await fetchService.fetch(getUrl(getSettingsUrl), {
      method: 'GET',
    });
  } catch (err: any) {
    console.warn(err.message);
    throw err;
  }
};

export interface SetSettingsRequest {
  fieldName: string;
  fieldValue: string;
}

const setSettings = async (settings: SetSettingsRequest[]) => {
  try {
    return await fetchService.fetch(getUrl(setSettingsUrl), {
      method: 'POST',
      body: JSON.stringify({data: settings}),
    });
  } catch (err: any) {
    console.warn(err.message);
    throw err;
  }
};

export const serverAPI = {
  getSettings,
  setSettings,
};
