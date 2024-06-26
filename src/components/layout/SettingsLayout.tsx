import SettingsLink from "../Settings/SettingsLink";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex ">
      <div>
        <SettingsLink />
        {/* <PersonalDetails/>      */}
      </div>
      {children}
    </div>
  );
}
