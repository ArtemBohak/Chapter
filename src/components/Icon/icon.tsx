import IcoMoon, { IconProps } from "react-icomoon";
import iconSet from "@/src/assets/icons/selection.json";

const Icon = (props: IconProps) => <IcoMoon iconSet={iconSet} {...props} />;

export default Icon;
