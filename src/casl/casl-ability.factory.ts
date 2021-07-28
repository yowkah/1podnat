import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  subject,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { UserAction } from 'src/common/enums';
import { UserEntity } from 'src/user/entities/user.entity';
import { VolumeEntity } from 'src/volume/entities/volume.entity';

type Subjects = InferSubjects<typeof UserEntity | typeof VolumeEntity> | 'all';

export type AppAbility = Ability<[UserAction, Subjects]>;

type flatVolume = VolumeEntity & { 'owner.id': VolumeEntity['owner']['id'] };

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserEntity) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>,
    );

    // superpowers
    if (user.isAdmin) {
      can(UserAction.Manage, 'all');
    }

    //#region  User Rules
    can(UserAction.Read, UserEntity, ['email', 'picture']);
    can(UserAction.Read, UserEntity, { id: user.id });
    can(UserAction.Delete, UserEntity, { id: user.id });
    //#endregion

    //#region  Volume Rules
    can(UserAction.Create, VolumeEntity);
    can<flatVolume>(UserAction.Read, VolumeEntity, { 'owner.id': user.id });
    can<flatVolume>(UserAction.Update, VolumeEntity, { 'owner.id': user.id });
    can<flatVolume>(UserAction.Delete, VolumeEntity, { 'owner.id': user.id });
    //#endregion
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
