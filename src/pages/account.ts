import {createPage} from '../components/page';
import {createTextField} from '../components/text-field';
import {createText} from '../components/text';
import {createVoiceControlledTextField} from '../components/voice-controlled-text-field';
import {createButton} from '../components/button';
import {createImageUploader} from '../components/image-uploader';
import {UserService} from '../services/user-service';
import {DataService} from '../services/data-service';
import {Projector} from 'maquette';

export let createAccountPage = (dataService: DataService, userService: UserService, projector: Projector) => {

  let {id, firstName, lastName, phoneNumber, image, company, address, country, city} = userService.getUserInfo();

  let doUpdate = () => {
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    image = canvas.toDataURL();

    userService.updateUserInfo({
      id,
      firstName,
      lastName,
      phoneNumber,
      company,
      address,
      city,
      country,
      image
    });
    document.location.hash = '#users';
  };

  let page = createPage({
    title: 'Account',
    dataService,
    body: [
      createVoiceControlledTextField({label: 'VOICE CONTROL', projector: projector}, { getValue: () => country, setValue: (value) => { country = value; }}),
      createTextField({ label: 'First name' }, { getValue: () => firstName, setValue: (value) => { firstName = value; } }),
      createTextField({ label: 'Last name' }, { getValue: () => lastName, setValue: (value) => { lastName = value; } }),
      createTextField({ label: 'phone number' }, { getValue: () => phoneNumber, setValue: (value) => { phoneNumber = value; } }),
      createTextField({ label: 'Company' }, { getValue: () => company, setValue: (value) => { company = value; } }),
      createTextField({ label: 'Address' }, { getValue: () => address, setValue: (value) => { address = value; } }),
      createTextField({ label: 'City' }, { getValue: () => city, setValue: (value) => { city = value; } }),
      createTextField({ label: 'Country' }, { getValue: () => country, setValue: (value) => { country = value; } }),
      createImageUploader({ projector: projector, userService: userService, image: image }, {}),
      createButton({ text: 'Update', primary: true }, { onClick: doUpdate })
    ]
  });
  return page;
};
