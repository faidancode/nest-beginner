import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { randomUUID } from 'crypto';
import { UpdateProfileDTO } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  private profiles = [
    {
      id: 'prof-1',
      name: 'Name 1',
      description: 'Description 1',
    },
    {
      id: 'prof-2',
      name: 'Name 2',
      description: 'Description 2',
    },
  ];

  findAll() {
    return this.profiles;
  }

  findOne(id: string) {
    return this.profiles.find((profile) => profile.id === id);
  }

  create(createProfileDTO: CreateProfileDTO) {
    const createdProfile = {
      id: randomUUID(),
      ...createProfileDTO,
    };

    this.profiles.push(createdProfile);
    return createdProfile;
  }

  update(id: string, updateProfileDTO: UpdateProfileDTO) {
    const matchingProfile = this.profiles.find(
      (existingProfile) => existingProfile.id === id,
    );

    if (!matchingProfile) {
      return HttpStatus.NOT_FOUND;
    }

    matchingProfile.name = updateProfileDTO.name;
    matchingProfile.description = updateProfileDTO.description;
    return matchingProfile;
  }

  delete(id: string) {
    const index = this.profiles.findIndex((profile) => profile.id === id);

    if (index === -1) {
      return false;
    }

    this.profiles.splice(index, 1);

    return true;
  }
}
