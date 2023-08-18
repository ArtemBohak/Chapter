// libs
import IcoMoon, { IconProps } from "react-icomoon";

// default assets
import iconSet from "@/src/assets/icons/selection.json";

const Icon = (props: IconProps) => <IcoMoon iconSet={iconSet} {...props} />;

export default Icon;
