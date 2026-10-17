import type * as React from 'react';

export type Status = 'valide' | 'verifier' | 'encours' | 'erreur' | 'neutre';

export interface StatusBadgeProps { status: Status; children?: React.ReactNode }
export declare function StatusBadge(props: StatusBadgeProps): React.ReactElement;

export interface QuestionOption { value: string; label: string; note?: string }
export interface SuggestedCode { code: string; label: string; count?: string; selected?: boolean }
export interface QuestionCardProps {
  title: string; help?: string;
  options?: QuestionOption[]; multiple?: boolean; defaultValue?: string | string[];
  codes?: SuggestedCode[]; freeText?: string;
  onChange?: (value: string | string[]) => void;
}
export declare function QuestionCard(props: QuestionCardProps): React.ReactElement;

export interface CitationProps { n: number | string; source: string; location?: string; quote?: string; active?: boolean; onClick?: () => void }
export declare function Citation(props: CitationProps): React.ReactElement;

export interface AnswerMetaProps { sources?: number; steps?: string[]; reliability?: string; verifyLabel?: string; open?: boolean }
export declare function AnswerMeta(props: AnswerMetaProps): React.ReactElement;

export interface SqlBlock { line: number; name: string; explain: string }
export interface SqlEditorProps { sql: string; title?: string; dialect?: string; blocks?: SqlBlock[]; explain?: boolean; height?: number | string }
export declare function SqlEditor(props: SqlEditorProps): React.ReactElement;

export interface LineageNodeProps {
  layer: 'source' | 'bronze' | 'silver' | 'gold'; label?: string; name: string; rows?: string; warn?: boolean;
  selected?: boolean; onClick?: () => void; style?: React.CSSProperties;
}
export declare function LineageNode(props: LineageNodeProps): React.ReactElement;

export interface KpiCardProps { label: string; value: React.ReactNode; unit?: string; delta?: string; deltaTone?: 'bon' | 'mauvais'; hint?: string }
export declare function KpiCard(props: KpiCardProps): React.ReactElement;

export interface IconProps { name: string; className?: string }
export declare function Icon(props: IconProps): React.ReactElement;

declare global {
  interface Window {
    Askelia: {
      StatusBadge: typeof StatusBadge; QuestionCard: typeof QuestionCard; Citation: typeof Citation; AnswerMeta: typeof AnswerMeta;
      SqlEditor: typeof SqlEditor; LineageNode: typeof LineageNode; KpiCard: typeof KpiCard; Icon: typeof Icon;
      iconSvg(name: string, className?: string): string;
      hydrateIcons(root?: ParentNode): void;
      highlightSql(line: string): string;
      mountShell(app: HTMLElement, opts?: { active?: string }): void;
    }
  }
}
