import {
    CHECK_LIST,
    ELEMENT_TRANSFORMERS,
    TEXT_FORMAT_TRANSFORMERS,
    TEXT_MATCH_TRANSFORMERS,
    Transformer
} from "@lexical/markdown"

export const defaultTransformers: Array<Transformer> = [
    CHECK_LIST,
    ...ELEMENT_TRANSFORMERS,
    ...TEXT_FORMAT_TRANSFORMERS,
    ...TEXT_MATCH_TRANSFORMERS,
]