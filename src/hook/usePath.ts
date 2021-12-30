import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Params } from '../models/global';

export function usePath() {
  const { org, name, filename, '*': other } = useParams<keyof Params>();
  const [filePath, setFilePath] = useState<string>('');
  const [pkgName, setPkgName] = useState<string>('');

  useEffect(() => {
    if (filename) {
      setFilePath(`${filename}${other ? `/${other}` : ''}`);
    }
  }, [filename, other]);

  useEffect(() => {
    setPkgName(`${org ? `${org}/${name}` : name}`);
  }, [org, name]);

  return { org, name, filename, other, filePath, pkgName };
}
