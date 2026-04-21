export interface GIVector {
  values: number[];
}

export interface GIVectorSimilarityResult {
  score: number;
  a: GIVector;
  b: GIVector;
}

export class GI_VectorEngine {
  normalize(vec: GIVector): GIVector {
    const mag = this.magnitude(vec);
    if (mag === 0) return { values: [...vec.values] };
    return { values: vec.values.map(v => v / mag) };
  }

  magnitude(vec: GIVector): number {
    return Math.sqrt(vec.values.reduce((sum, v) => sum + v * v, 0));
  }

  dot(a: GIVector, b: GIVector): number {
    const len = Math.min(a.values.length, b.values.length);
    let sum = 0;
    for (let i = 0; i < len; i++) {
      sum += a.values[i] * b.values[i];
    }
    return sum;
  }

  cosineSimilarity(a: GIVector, b: GIVector): number {
    const magA = this.magnitude(a);
    const magB = this.magnitude(b);
    if (magA === 0 || magB === 0) return 0;
    return this.dot(a, b) / (magA * magB);
  }

  euclideanDistance(a: GIVector, b: GIVector): number {
    const len = Math.min(a.values.length, b.values.length);
    let sum = 0;
    for (let i = 0; i < len; i++) {
      const diff = a.values[i] - b.values[i];
      sum += diff * diff;
    }
    return Math.sqrt(sum);
  }

  manhattanDistance(a: GIVector, b: GIVector): number {
    const len = Math.min(a.values.length, b.values.length);
    let sum = 0;
    for (let i = 0; i < len; i++) {
      sum += Math.abs(a.values[i] - b.values[i]);
    }
    return sum;
  }

  similarity(a: GIVector, b: GIVector): GIVectorSimilarityResult {
    return {
      score: this.cosineSimilarity(a, b),
      a,
      b
    };
  }

  add(a: GIVector, b: GIVector): GIVector {
    const len = Math.min(a.values.length, b.values.length);
    const out = [];
    for (let i = 0; i < len; i++) {
      out.push(a.values[i] + b.values[i]);
    }
    return { values: out };
  }

  subtract(a: GIVector, b: GIVector): GIVector {
    const len = Math.min(a.values.length, b.values.length);
    const out = [];
    for (let i = 0; i < len; i++) {
      out.push(a.values[i] - b.values[i]);
    }
    return { values: out };
  }

  scale(vec: GIVector, factor: number): GIVector {
    return { values: vec.values.map(v => v * factor) };
  }

  average(vectors: GIVector[]): GIVector {
    if (vectors.length === 0) return { values: [] };

    const len = vectors[0].values.length;
    const out = new Array(len).fill(0);

    for (const vec of vectors) {
      for (let i = 0; i < len; i++) {
        out[i] += vec.values[i];
      }
    }

    return { values: out.map(v => v / vectors.length) };
  }
}

export function createGIVectorEngine() {
  return new GI_VectorEngine();
}

