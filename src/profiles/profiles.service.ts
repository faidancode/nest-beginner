import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { UpdateProfileDTO } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  private profiles = [
    {
      id: randomUUID(),
      name: 'Name 1',
      description: 'Description 1',
    },
    {
      id: randomUUID(),
      name: 'Name 2',
      description: 'Description 2',
    },
  ];

  findAll() {
    return this.profiles;
  }

  findOne(id: string) {
    const matchingProfile = this.profiles.find((profile) => profile.id === id);
    if (!matchingProfile) {
      throw new NotFoundException(`Profile ${id} not found`);
    }

    return matchingProfile;
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
      throw new NotFoundException(`profile ${id} not found`);
    }

    matchingProfile.name = updateProfileDTO.name;
    matchingProfile.description = updateProfileDTO.description;
    return matchingProfile;
  }

  delete(id: string) {
    const index = this.profiles.findIndex((profile) => profile.id === id);

    if (index === -1) {
      throw new NotFoundException(`Profile ${id} not found`);
    }

    this.profiles.splice(index, 1);

    return {
      status: 'OK',
      message: `Profile with ID ${id} deleted successfully`,
    };
  }
}
