import {BleError, BleManager, Device, Service} from 'react-native-ble-plx';
import {bluetoothDeviceAddress} from '../constants/bluetooth';
import log from './log';
import * as base64 from 'base-64';

const bluetooth = new BleManager();

export const isEnabled = () => {
  return bluetooth.state();
};

export const scan = async () => {
  bluetooth.startDeviceScan(null, null, (_error: BleError | null, _scannedDevice: Device | null) => {
    if (_error) {
      console.warn(JSON.stringify(_error, null, 2));
    } else {
      if (_scannedDevice?.id === bluetoothDeviceAddress) {
        log.complex('BLUETOOTH', `device: ${JSON.stringify(_scannedDevice, null, 2)}`);
      }
    }
  });
};

export const connect = async (): Promise<Device> => {
  log.complex('BLUETOOTH', `creating connection with ${bluetoothDeviceAddress}...`);

  const device = await bluetooth.connectToDevice(bluetoothDeviceAddress);
  device.onDisconnected(() => log.complex('BLUETOOTH', 'disconnected'));

  if (await device.isConnected()) {
    log.complex('BLUETOOTH', `connected to ${bluetoothDeviceAddress}.`);
  } else {
    log.complex('BLUETOOTH DEVICE', 'can`t write message when device is not connected');
  }

  return device;
};

export const disconnect = async (device: Device) => {
  if (await device.isConnected()) {
    log.complex('BLUETOOTH', `canceling connection with ${bluetoothDeviceAddress}...`);
    await device.cancelConnection();
  } else {
    log.complex('BLUETOOTH', `connection with ${bluetoothDeviceAddress} already canceled.`);
  }
};

const _notify = async (device: Device, data = 'vibrate') => {
  const allServicesAndCharacteristics = await device.discoverAllServicesAndCharacteristics();
  const discoveredServices = await allServicesAndCharacteristics.services();

  discoveredServices.forEach(async (_service: Service) => {
    const newCharacteristics = await _service.characteristics();

    newCharacteristics.forEach(async (characteristic) => {
      if (characteristic.isWritableWithResponse) {
        try {
          log.complex('BLUETOOTH', `notyfing bluetooth device.`);
          await characteristic.writeWithResponse(base64.encode(data));
        } catch (err) {
          log.complex('BLUETOOTH', `Error: ${JSON.stringify(err, null, 2)}`);
        }
      }
    });
  });
};

export const notify = async (data = 'vibrate') => {
  const device = await connect();
  await _notify(device, data);
  await disconnect(device);
};
