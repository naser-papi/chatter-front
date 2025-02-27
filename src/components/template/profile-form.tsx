import { css } from "@emotion/css";
import ProfileFormHeader from "@/components/organism/profile/profile-form-header";
import ProfileFormBody from "@/components/organism/profile/profile-form-body";
import ProfileFormActions from "@/components/organism/profile/profile-form-actions";
import ProfileProvider from "@/contexts/profile-context";

const ProfileForm = () => {
  return (
    <div
      className={css`
        height: 100vh;
        container-type: inline-size;
        container-name: profile-page;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        form {
          width: clamp(300px, 100%, 600px);
          display: grid;
          place-items: center;
          grid-template-rows: auto 1fr 60px;
          row-gap: 2rem;
          border: 1px solid #494646;
          border-radius: 1rem;
        }

        .profile-form-header {
          text-align: center;
          width: 100%;
          padding: 1rem;
          border-bottom: 1px solid #494646;

          h2 {
            font-size: 2rem;
          }
        }

        .profile-form-body {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding: 0 1rem;
          font-size: 1.5rem;

          .image-uploader {
            font-size: 1.5rem;
          }
        }

        .profile-form-actions {
          border-top: 1px solid #494646;
          width: 100%;
          padding: 1em 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.25rem;
        }
      `}
    >
      <form>
        <ProfileProvider>
          <ProfileFormHeader />
          <ProfileFormBody />
          <ProfileFormActions />
        </ProfileProvider>
      </form>
    </div>
  );
};

export default ProfileForm;
