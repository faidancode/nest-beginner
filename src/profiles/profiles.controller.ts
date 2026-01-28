import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { UpdateProfileDTO } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';
import type { UUID } from 'crypto';
import { ProfilesGuard } from './profiles.guard';

@Controller('profiles')
export class ProfilesController {
  constructor(private profileService: ProfilesService) {}
  // GET /profiles
  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  // GET /profiles/:id
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.profileService.findOne(id);
  }

  // POST /profiles
  @Post()
  create(@Body() createProfileDTO: CreateProfileDTO) {
    return this.profileService.create(createProfileDTO);
  }

  // PUT /profiles/:id
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateProfileDTO: UpdateProfileDTO,
  ) {
    return this.profileService.update(id, updateProfileDTO);
  }

  // DELETE /profiles/:id
  @Delete(':id')
  @UseGuards(ProfilesGuard)
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.profileService.delete(id);
  }
}
