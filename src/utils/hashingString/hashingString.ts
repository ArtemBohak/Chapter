import sjcl from "sjcl";

const hashingString = (string: string) => {
  const myBitArray = sjcl.hash.sha256.hash(string);

  return sjcl.codec.hex.fromBits(myBitArray);
};

export default hashingString;
