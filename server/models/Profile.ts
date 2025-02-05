import { db } from "../config/db.js";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";

/**
 * @property {string} email
 * @property {string} fullname
 * @property {string} password
 */
export class Profile {
  static findOneByEmail(email) {
    return db.read().profiles.find(profile => profile.email === email);
  }

  static async save(attributes) {
    const profileAttributes = { id: nanoid(16), ...attributes };

    if (profileAttributes.password) {
      profileAttributes.password = await bcrypt.hash(profileAttributes.password, 10);
    }

    const data = db.read();
    data.profiles.push(profileAttributes);

    db.write(data);
  }

  static async comparePassword(email, candidatePassword) {
    const profile = Profile.findOneByEmail(email);

    if (!profile) {
      return false;
    }

    return await bcrypt.compare(candidatePassword, profile.password);
  }
}
