import {ImageGallery} from '@georstat/react-native-image-gallery';
import {useState, useEffect} from 'react';
import {Button} from 'react-native';
import {View} from 'react-native';
import SCREEN from '../../../Layout';
const images = [
  {
    id: 1,
    url: 'https://s3-alpha-sig.figma.com/img/d045/3cca/48fb485a7b180c98168bd2b802b35a42?Expires=1678665600&Signature=DDSEtmB9l5xPyKU-gy8nDNXWoqnlSptXVYPRougprLMZAc80QddPCTEIAbTzUvI0y-0B~TfUjEJ7oywggFluxnrbhT33jWHYX3wbFA9X9zXEy-OCrReHtqtejFYV6RxLI8wbu2~alOJNa9EpcLQfNT1LEbDkvx2rB9A1nmf~gmJMMOof-ktv3AVf6l85SuHlcjaC0e4vhGIbjtwOxVUdkdTUA2j3M9cgxK924koX3KHAgb3DbU1myPLzbA~h7JTUJwc5smW5WbzVrW-VnSGzcyVOAPY8X4dFwXKsBVWYbFqcfWRdNaO-nHq68BelZ~zi6Au3Cj3pFQbIn977HG2GkQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    // any other extra info you want
  },
  {
    id: 2,
    url: 'https://s3-alpha-sig.figma.com/img/7368/d91e/63d743ddf2be01677fb7d03bce388578?Expires=1678665600&Signature=EuFquSXtrw1kZoSstpWpB6~4FIeFhVfYfAmOyoa0HzcEcAV1C52c1kmdCNJV4kxyObvIuCaEo~j0gr5oYIrkvmy4P-WJ2kGCB-FIWxPB7BPVLRHylkdYXF-n3oeCEPyXVJNoONUvoD13x0NDyHCem439p9wPU3dQdqtW2kgzYU29bN4XSlILAHkhtpPcSWmdZ4NTQBVljfJkMWLNAfyoN-A5xF-WmWLsWtTnmSTS3SuNYdTGj7li59FqSs0KOVfoCjYh-Of09ajNQ0xM4GinHnIFGoBXvN-b-YIbodKw5d3SC2XBsJ20EF6HX-UWtohjXP-6TkO5O6eJn0Cear6nCg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',

    // any other extra info you want
  },
  {
    id: 3,
    url: 'https://s3-alpha-sig.figma.com/img/0152/cfb2/aa3f6448f00b6eca8c34104fdd1be416?Expires=1678665600&Signature=f2o216viLlTfZhUceRbyVKIknlB31a0MUrhQJcNaqkNo-fCCo~V8BfLpBOuPsWOjyzEshMjKr2Pi2aL3hS7OM93AbFScLzYumHBAZRyusU3dQddt3qX6SaeqiB9wzHOiQWtMPLemnrhlsB3JWPVocdGn6EwFx4a9S20Uz5a5C857rNz2CYcZYFyMsfKNUK8EjIwqlZk3VGAK9J8m3ZbECwoMMEM40ZfCFkv2ok4A3NLR4K1SgEkJjwRY6-iu11cHc-Wo0AZivARwTrWXy81NjKzMqHXJqwZEsitZEetoccTuELSvcfE2DPf~4WhFjjQwiPaTkhBK3~Cw-2i~rO38hg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',

    // any other extra info you want
  },
  {
    id: 3,
    url: 'https://s3-alpha-sig.figma.com/img/0152/cfb2/aa3f6448f00b6eca8c34104fdd1be416?Expires=1678665600&Signature=f2o216viLlTfZhUceRbyVKIknlB31a0MUrhQJcNaqkNo-fCCo~V8BfLpBOuPsWOjyzEshMjKr2Pi2aL3hS7OM93AbFScLzYumHBAZRyusU3dQddt3qX6SaeqiB9wzHOiQWtMPLemnrhlsB3JWPVocdGn6EwFx4a9S20Uz5a5C857rNz2CYcZYFyMsfKNUK8EjIwqlZk3VGAK9J8m3ZbECwoMMEM40ZfCFkv2ok4A3NLR4K1SgEkJjwRY6-iu11cHc-Wo0AZivARwTrWXy81NjKzMqHXJqwZEsitZEetoccTuELSvcfE2DPf~4WhFjjQwiPaTkhBK3~Cw-2i~rO38hg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',

    // any other extra info you want
  },
];

const MyGallery = ({Data}) => {
  const [isOpen, setIsOpen] = useState(true);
  const openGallery = () => setIsOpen(true);
  const closeGallery = () => setIsOpen(false);
  // useEffect(() => {
  //   console.log(Data, 'images');
  // }, [Data]);

  return (
    <View style={{height: SCREEN.WIDTH * 1.02, backgroundColor: 'transparent'}}>
      <ImageGallery close={closeGallery} isOpen={isOpen} images={Data} />
    </View>
  );
};
export default MyGallery;
